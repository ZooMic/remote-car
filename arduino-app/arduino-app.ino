#include <Servo.h>
#include <HCSR04.h>

#define servoPin 9
#define bridgePinA 7
#define bridgePinB 8
#define blinkerPin 6

#define frontSensorTrigPin 4
#define frontSensorEchoPin 5

enum ServoState {Left = 0, Straight = 1, Right = 2};
enum EngineState {Forward = 0, Off = 1, Backward = 2};

ServoState servoState;
ServoState previousServoState;

EngineState engineState;
EngineState previousEngineState;

Servo wheelsServo;
UltraSonicDistanceSensor frontSensor(frontSensorTrigPin, frontSensorEchoPin);

String inData = "";

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
      digitalWrite(bridgePinA, LOW);
      digitalWrite(bridgePinB, HIGH);
      break;  
    }
    case Off:
    {
      digitalWrite(bridgePinA, LOW);
      digitalWrite (bridgePinB, LOW);
      break;  
    }
     case Backward:
    {
      digitalWrite(bridgePinA, HIGH);
      digitalWrite(bridgePinB, LOW);
      break;  
    }
  }
  previousEngineState = engineState;
}


void tryGetIncomingData() {
  if (Serial.available() > 0) {  

   digitalWrite(6, HIGH);
   delay(500);
   digitalWrite(6, LOW);
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

int delayer = 0;

void handleSensorsData() {

  if (delayer < 19999 ) {
    delayer++;
    return;
  }
  
  double frontDistance = frontSensor.measureDistanceCm();
  Serial.println(frontDistance,2);

  delayer = 0;
}

void setup() {
  Serial.begin(9600);
  
  wheelsServo.attach(servoPin);
  // Engine setup
  pinMode(bridgePinA, OUTPUT);
  pinMode(bridgePinB, OUTPUT);
  //Blinker setup
  pinMode(blinkerPin, OUTPUT);
  // Front sensor setup
  pinMode(frontSensorTrigPin, OUTPUT);
  pinMode(frontSensorEchoPin, INPUT);
}

void loop() {  
  // Serial.println(inData);
  tryGetIncomingData();
  handleServoState();
  handleEngineState();  
  handleSensorsData();
}
