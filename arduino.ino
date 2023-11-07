// CÓDIGO DO ARDUINO

#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>
  
PN532_I2C pn532i2c(Wire);
PN532 nfc(pn532i2c);

int redPin = 8;
int greenPin = 10;

void setup(void) {
  Serial.begin(115200);

  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (! versiondata) {
    while (1);
  }
  
  nfc.setPassiveActivationRetries(0xFF);
  
  nfc.SAMConfig();
}

void loop(void) {
  boolean success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 }; 
  uint8_t uidLength;
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength);
  
  if (success) {
    digitalWrite(greenPin, HIGH);
    digitalWrite(redPin, LOW);

    String hex_value = "";
    for (uint8_t i=0; i < uidLength; i++) {
      hex_value += (String)uid[i];
    }

    Serial.println(hex_value);  

    // 
    if(hex_value == "83252118649701") { 
      Serial.println("This is Key Tag. ");
    }
    else if(hex_value == "230522426") {
      Serial.println("This is Card Tag. ");
    }
    else if(hex_value == "63156295") {
      Serial.println("This is Phone Tag. ");
    }
    
    delay(500);
  }
  else
  {
    digitalWrite(greenPin, LOW);
    digitalWrite(redPin, HIGH);
  }
}