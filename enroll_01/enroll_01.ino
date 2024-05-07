/***************************************************
  This is an example sketch for our optical Fingerprint sensor

  Designed specifically to work with the Adafruit BMP085 Breakout
  ----> http://www.adafruit.com/products/751

  These displays use TTL Serial to communicate, 2 pins are required to
  interface
  Adafruit invests time and resources providing this open source code,
  please support Adafruit and open-source hardware by purchasing
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.  
  Small bug-fix by Michael cochez

  BSD license, all text above must be included in any redistribution
 ****************************************************/
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>
#include <SoftwareSerial.h>
#include <Adafruit_Fingerprint.h>
#include <Adafruit_SSD1306.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_GFX.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

#define FIREBASE_HOST "fingertrax-df67d-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "AIzaSyBfODmm2QCb5vxk69YYs3qWktgijqu8xqM"
#define WIFI_SSID "OPPO A37fw"
#define WIFI_PASSWORD "12345678"

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define max_fingerPrints 1000
int numPresentID = 0;
int attendanceArr[max_fingerPrints];

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

int id;
unsigned long sendDataPrevMillis = 0;
String stateValue;
String fingerprintId;
bool signupOK = false;

#if (defined(_AVR) || defined(ESP8266)) && !defined(AVR_ATmega2560_)
// For UNO and others without hardware serial, we must use software serial...
// pin #2 is IN from sensor (GREEN wire)
// pin #3 is OUT from arduino  (WHITE wire)
// Set up the serial port to use softwareserial..
//Fingerprint scanner Pins
#define Finger_Rx 14  //D5
#define Finger_Tx 12  //D6
// Set up the serial port to use softwareserial..
SoftwareSerial mySerial(Finger_Rx, Finger_Tx);

#else
// On Leonardo/M0/etc, others with hardware serial, use hardware serial!
// #0 is green wire, #1 is white
#define mySerial Serial1

#endif


Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

void setup() {
  Serial.begin(9600);

  // initialize the OLED object
  if(!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    display.println(F("SSD1306 allocation failed"));
    for(;;); // Don't proceed, loop forever
  }

  // Initialize WiFi connection
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    display.print(".");
  }
  display.println("...Welcome to FingerTrax...");
  display.display();

  display.clearDisplay();

  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  

  // Initialize Firebase configuration
  /* Assign the api key (required) */
  config.api_key = FIREBASE_AUTH;
  config.database_url = FIREBASE_HOST;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")) {    
    signupOK = true;
  }
  else {
    display.printf("%s\n", config.signer.signupError.message.c_str());
  }

/* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop()
{
       
  // Read state from Firebase 
  if (Firebase.RTDB.getString(&fbdo, "/State/arduinoState")) {
    if (fbdo.dataType() == "string") {
      stateValue = fbdo.stringData();}
  } else { display.println(fbdo.errorReason());}

  delay(1000);

  // Read Id from firebase
  if( Firebase.RTDB.getString(&fbdo, "/FingerprintData/stuFingerprintID"))
  {
    if(fbdo.dataType() == "string")
    {           
      fingerprintId = fbdo.stringData();
      id = fingerprintId.toInt();
    }
    else{
       display.println(fbdo.errorReason());
    }
  }
  delay(1000);  // Wait for 1 second before checking again

  if( stateValue == "1")
  {
    finger.begin(57600);

    if (finger.verifyPassword()) {
      display.println("...Enrolling State... \n");
      display.display();
      delay(1000);
      display.clearDisplay();
    } else {
      display.println("Did not find sensor!\n");
      display.display();
      delay(1000);
      display.clearDisplay();

      while (1) { delay(1); }

    }

    getFingerprintEnroll();
    Firebase.RTDB.setString(&fbdo, "/State/arduinoState", "0"); 
  }
  else if(stateValue == "2")
  {
    finger.begin(57600);

    if (finger.verifyPassword()) {
      display.println("Deleting State \n");
      display.display();
      delay(1000);
      display.clearDisplay();
    } else {
      display.println("Did not find sensor!\n");
      display.display();
      delay(1000);
      display.clearDisplay();

      while (1) { delay(1); }

    }

    deleteFingerprint();
    Firebase.RTDB.setString(&fbdo, "/State/arduinoState", "0");
  }
  else if(stateValue == "3")  
  {    
    finger.begin(57600);

    if (finger.verifyPassword()) {
      display.println("Attendance Marking State \n");
      display.display();
      delay(1000);
      display.clearDisplay();
    } else {
      display.println("Did not find sensor!\n");
      display.display();
      delay(1000);
      display.clearDisplay();

      while (1) { delay(1); }

    }    

    finger.getTemplateCount();

    if (finger.templateCount > 0) {
      display.clearDisplay();

      // Display Text
      display.setTextSize(1);
      display.setTextColor(WHITE);
      display.setCursor(0, 0);  

      display.println("Sensor contains "); 
      display.display();
      display.print(finger.templateCount); 
      display.display();
      display.println(" templates");      
      display.display();
      delay(2000);

      display.println("Waiting for valid finger...");
      display.display();
      delay(2000);
      display.clearDisplay(); 

      getFingerprintID();

      display.println("Successful Record!!");
      display.display();
      delay(2000);

      getFingerprintIDez(); 

    } else{
      display.println("Sensor doesn't contain any fingerprint data");
      display.display();
      delay(2000);

      display.clearDisplay();
      display.setTextSize(1);
      display.setTextColor(WHITE);
      display.setCursor(0, 0);

      display.println("\nYou can move to Enroll mode");
      display.display();
      delay(500);
            
      Firebase.RTDB.setString(&fbdo, "/State/arduinoState", "0");
    }  
     
  }   
  else if(stateValue == "0")
  {
    display.println("Exit");  
    display.display();      
  } 
}


//attendance marking 
int getFingerprintID() {

  display.clearDisplay();

  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  
  display.println("Now enter your fingerprint"); 
  display.display();   
  delay(3000);     

  display.clearDisplay();

  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  
  int p = finger.getImage();
  switch (p) {  
    case FINGERPRINT_OK:
      display.println("Remove finger");
      display.display();
      delay(1000);
      break;
    case FINGERPRINT_NOFINGER:
      display.print(".");
      display.display();
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      display.println("Communication error");
      display.display();      
      return p;
    case FINGERPRINT_IMAGEFAIL:
      display.println("Imaging error");
      display.display();      
      return p;
    default:
      display.println("Unknown error");
      display.display();      
      return p;
  }  

  // OK success!

  p = finger.image2Tz();
  switch (p) {
    case FINGERPRINT_OK:
      display.println("Image converted");
      display.display();
      delay(1000);
      break;
    case FINGERPRINT_IMAGEMESS:
      display.println("Image too messy");
      display.display();      
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      display.println("Communication error");
      display.display();      
      return p;
    case FINGERPRINT_FEATUREFAIL:
      display.println("Could not find fingerprint features");
      display.display();
      delay(2000);
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      display.println("Could not find fingerprint features");
      display.display();
      delay(2000);
      return p;
    default:
      display.println("Unknown error");
      display.display();      
      return p;
  }
  

  // OK converted!
  p = finger.fingerSearch();
  if (p == FINGERPRINT_OK) {
    display.println("Found a print match!");
    display.display();
    delay(1000);
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    display.println("Communication error");
    display.display();
    delay(2000);
    return p;
  } else if (p == FINGERPRINT_NOTFOUND) {
    display.println("Did not find a match");
    display.display();
    delay(2000);
    return p;
  } else {
    display.println("Unknown error");
    display.display();
    delay(2000);
    return p;
  }  

  // found a match!
  display.println("\nFound ID #"); 
  display.display();
  display.println(finger.fingerID);
  display.display();  
  display.println(" with confidence of "); 
  display.display();
  display.println(finger.confidence);
  display.display();
  delay(2000);

  display.clearDisplay();

  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);

  id =  finger.fingerID;

  for(int i=0; i<numPresentID; i++)
  {
    if( attendanceArr[i] == id){
      display.println(" don't sign again ID.");
      display.display();
      display.println(id);         
      display.display();
      delay(2000);
      return id;
    }
  }

  attendanceArr[numPresentID++] = id;

  display.clearDisplay();

  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0); 

  // send it to the firebase
  for(int i=0; i<numPresentID; i++)
  {
    String path = "/Attendance/" + String(attendanceArr[i]);
    String data = "Present";

    if(Firebase.RTDB.setString(&fbdo, (const char*)path.c_str(), (const char*)data.c_str()))
    {      
    }else{
      display.print("Fail to mark attendance for ID. ");
      display.display();
      display.print( String(attendanceArr[i]));
      display.display();      
      delay(1000);
    }
  }
  return id;
}

// returns -1 if failed, otherwise returns ID #
int getFingerprintIDez() {
  
  display.clearDisplay();

  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);

  int p = finger.getImage();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK)  return -1;

  // found a match!
  display.println("Found ID #"); 
  display.display();
  display.println(finger.fingerID);
  display.display();  
  display.print(" with confidence of "); 
  display.display();
  display.println(finger.confidence);
  display.display();
  delay(2000);

  id = finger.fingerID;

  return id;
}


// delete fingerprints
int deleteFingerprint()
{
  display.clearDisplay();

  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  
  display.println("Given ID is : "+ fingerprintId);
  display.display();
  delay(2000); 
      
  //delete
  int p = -1;

  p = finger.deleteModel(id);
  if (p == FINGERPRINT_OK) {  
  display.print(F("Deleted!\n"));
  display.display();
  return 0;
  } 
  else if (p == FINGERPRINT_PACKETRECIEVEERR) {  
  display.print(F("Communication error!\n"));
  display.display();
  return p;
  } else if (p == FINGERPRINT_BADLOCATION) {  
  display.print(F("Could not delete in that location!\n"));
  display.display();
  return p;
  } else if (p == FINGERPRINT_FLASHERR) {  
  display.print(F("Error writing to flash!\n"));
  display.display();
  return p;
  } else {  
  display.print(F("Unknown error:\n"));
  display.display();
  return p;
  }      
  return true;
}

// enrolling fingerprints
int getFingerprintEnroll()
{
  display.clearDisplay();

  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);

  
  display.println("Your ID is : "+ fingerprintId);
  display.display();
  delay(1000);      

  display.println("Hold your Fingerprint now \n" );
  display.display(); 
  delay(1000);

  display.clearDisplay();

  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);

  int p = -1;      
  //display.println(id);
  //display.display();
  
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        display.println("Remove your finger");
        display.display();
        delay(1000);
        break;
      case FINGERPRINT_NOFINGER:
        display.print(".");
        display.display();
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        display.println("Communication error");
        display.display();
        break;
      case FINGERPRINT_IMAGEFAIL:
        display.println("Imaging error");
        display.display();
        break;
      default:
        display.println("Unknown error");
        display.display();
        break;
    }
  }

  display.clearDisplay();

  // // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);

  // OK success        

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      display.println("Image converted");
      display.display();
      break;
    case FINGERPRINT_IMAGEMESS:
      display.println("Image too messy");
      display.display();
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      display.println("Communication error");
      display.display();
      return p;
    case FINGERPRINT_FEATUREFAIL:
      display.println("Could not find fingerprint features");
      display.display();
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      display.println("Could not find fingerprint features");
      display.display();
      return p;
    default:
      display.println("Unknown error");
      display.display();
      return p;
  }

  display.clearDisplay();
  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  display.print("ID ");
  display.display();      
  display.println(id);
  display.display();      

  p = -1;
  display.println("\nPlace same finger again");
  display.display();
  delay(2000);

  display.clearDisplay();

  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);

  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        display.println("Remove finger");
        display.display();
        delay(1000);

        break;
      case FINGERPRINT_NOFINGER:
        display.print(".");
        display.display();
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        display.println("Communication error");
        display.display();
        break;
      case FINGERPRINT_IMAGEFAIL:
        display.println("Imaging error");
        display.display();
        break;
      default:
        display.println("Unknown error");
        display.display();
        break;
    }
  }

  display.clearDisplay();

  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      display.println("Image converted");
      display.display();
      delay(1000);
      break;
    case FINGERPRINT_IMAGEMESS:
      display.println("Image too messy");
      display.display();
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      display.println("Communication error");
      display.display();
      return p;
    case FINGERPRINT_FEATUREFAIL:
      display.println("Could not find fingerprint features");
      display.display();
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      display.println("Could not find fingerprint features");
      display.display();
      return p;
    default:
      display.println("Unknown error");
      display.display();
      return p;
  }

  
  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    display.println("Prints matched!\n");
    display.display();
    delay(1000);

  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    display.println("Communication error");
    display.display();
    return p;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    display.println("Fingerprints did not match");
    display.display();
    return p;
  } else {
    display.println("Unknown error");
    display.display();
    return p;
  }
  
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    display.println("fingerprint Stored to Id :" + fingerprintId);
    display.display();
    delay(2000);
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    display.println("Communication error");
    display.display();
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    display.println("Could not store in that location");
    display.display();
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    display.println("Error writing to flash");
    display.display();
    return p;
  } else {
    display.println("Unknown error");
    display.display();
    return p;
  }   

  display.clearDisplay();  

  return true;
}
