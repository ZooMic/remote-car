#include <Servo.h>
Servo wheelsServo;

// Servo : pin 9
// H bridge: pin 7 & 8

enum ServoState {Left = 0, Straight = 1, Right = 2};
enum EngineState {Forward = 0, Off = 1, Backward = 2};

ServoState servoState;
ServoState previousServoState;

EngineState engineState;
EngineState previousEngineState;

char incomingBuffer[10];
 
void handleServoState() {
  if (servoState == previousServoState) {
    return;  
  }
  
  switch (servoState)
  {
    case Left:
    {
      wheelsServo.write(0);
      break;  
    }
    case Straight:
    {
      wheelsServo.write(90);
      break;
    }
    case Right:
    {
      wheelsServo.write(180);
      break;
    }
  }
  previousServoState = servoState;
}

void handleEngineState() {
 if (engineState == previousEngineState) {
    return;  
  }
  
  switch (engineState)
  {
    case Forward:
    {
      digitalWrite(7, LOW);
      digitalWrite(8, HIGH);
      break;  
    }
    case Off:
    {
      digitalWrite(7, LOW);
      digitalWrite (8, LOW);
      break;  
    }
     case Backward:
    {
      digitalWrite(7, HIGH);
      digitalWrite(8, LOW);
      break;  
    }
  }
  previousEngineState = engineState;
}

String inData = "";

void tryGetIncomingData() {
  if (Serial.available() > 0) {  

   digitalWrite(3, HIGH);
   delay(500);
   digitalWrite(3, LOW);
   delay(500);
    
    while (Serial.available()) {
    char inChar = (char)Serial.read();     
    inData += inChar; 
    }
    
    if (inData.charAt(0) == 'R') {
      servoState = Right;
    }

     if (inData.charAt(0) == 'L') {
      servoState = Left;
    }

     if (inData.charAt(0) == 'S') {
      servoState = Straight;
    }

     if (inData.charAt(1) == 'F') {
      engineState = Forward;
    }

     if (inData.charAt(1) == 'B') {
      engineState = Backward;
    }
    
     if (inData.charAt(1) == 'O') {
      engineState = Off;
    } 
        
   inData ="";
  }
}

void setup() {
  Serial.begin(9600);
  wheelsServo.attach(9);
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(3, OUTPUT);
}

void loop() {  
  Serial.println(inData);
  tryGetIncomingData();
  handleServoState();
  handleEngineState();  
}
