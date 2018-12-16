#include <Servo.h>
#include <HCSR04.h>

#define servoPin 9
#define bridgePinA 7
#define bridgePinB 8
#define blinkerPin 6

#define frontSensorTrigPin 5
#define frontSensorEchoPin 4

#define frontRightSensorTrigPin 3
#define frontRightSensorEchoPin 2

#define frontLeftSensorTrigPin 11
#define frontLeftSensorEchoPin 10

#define leftSensorTrigPin A0
#define leftSensorEchoPin A1

#define rightSensorTrigPin A2
#define rightSensorEchoPin A3

enum ServoState {Left = 0, Straight = 1, Right = 2};
enum EngineState {Forward = 0, Off = 1, Backward = 2};

ServoState servoState;
ServoState previousServoState;

EngineState engineState;
EngineState previousEngineState;

Servo wheelsServo;
UltraSonicDistanceSensor frontSensor(frontSensorTrigPin, frontSensorEchoPin);
UltraSonicDistanceSensor frontRightSensor(frontRightSensorTrigPin, frontRightSensorEchoPin);
UltraSonicDistanceSensor frontLeftSensor(frontLeftSensorTrigPin, frontLeftSensorEchoPin);
UltraSonicDistanceSensor leftSensor(leftSensorTrigPin, leftSensorEchoPin);
UltraSonicDistanceSensor rightSensor(rightSensorTrigPin, rightSensorEchoPin);

String inData = "";

void handleServoState() {
  if (servoState == previousServoState) {
    return;  
  }
  
  switch (servoState)
  {
    case Right:
    {
      wheelsServo.write(60);
      break;  
    }
    case Straight:
    {
      wheelsServo.write(85);
      break;
    }
    case Left:
    {
      wheelsServo.write(105);
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
  
  if (Serial.available() == 0) {
    return;
  }

   digitalWrite(6, HIGH);
   delay(500);
   digitalWrite(6, LOW);
   delay(500);
    
    while (Serial.available()) {
    char inChar = (char)Serial.read();     
    inData += inChar; 
    }
    
    if (inData.charAt(0) == 'r') {
      servoState = Right;
    }

     if (inData.charAt(0) == 'l') {
      servoState = Left;
    }

     if (inData.charAt(0) == 's') {
      servoState = Straight;
    }

     if (inData.charAt(1) == 'f') {
      engineState = Forward;
    }

     if (inData.charAt(1) == 'b') {
      engineState = Backward;
    }
    
     if (inData.charAt(1) == 'o') {
      engineState = Off;
    } 
        
   inData ="";  
}

int delayer = 0;
int delayer2 = 0;

void handleSensorsData() {

  if (delayer < 29999 ) {
    ++delayer;
    return;
  }

  if (delayer2 < 29999 ) {
    ++delayer2;
    return;
  }
  
  double frontDistance = frontSensor.measureDistanceCm();
  double frontRightDistance = frontRightSensor.measureDistanceCm();
  double frontLeftDistance = frontLeftSensor.measureDistanceCm();
  double leftDistance = leftSensor.measureDistanceCm();
  double rightDistance = rightSensor.measureDistanceCm();
  
  Serial.print("|90:");
  Serial.print((int)frontDistance);
  Serial.print("|50:");
  Serial.print((int)frontRightDistance);
  Serial.print("|130:");
  Serial.print((int)frontLeftDistance);
  Serial.print("|180:");
  Serial.print((int)leftDistance);
  Serial.print("|0:");
  Serial.print((int)rightDistance);

  delayer = 0;
  delayer2 = 0;
}

void setup() {
  Serial.begin(9600);
  // Servo setup
  wheelsServo.attach(servoPin);
  // Engine setup
  pinMode(bridgePinA, OUTPUT);
  pinMode(bridgePinB, OUTPUT);
  //Blinker setup
  pinMode(blinkerPin, OUTPUT);
  // Front sensor setup
  pinMode(frontSensorTrigPin, OUTPUT);
  pinMode(frontSensorEchoPin, INPUT);
  // Right front sensor setup
  pinMode(frontRightSensorTrigPin, OUTPUT);
  pinMode(frontRightSensorEchoPin, INPUT);
  // Left front sensor setup
  pinMode(frontLeftSensorTrigPin, OUTPUT);
  pinMode(frontLeftSensorEchoPin, INPUT);
  // Left sensor setup
  pinMode(leftSensorTrigPin, OUTPUT);
  pinMode(leftSensorEchoPin, INPUT);
  // Right sensor setup
  pinMode(rightSensorTrigPin, OUTPUT);
  pinMode(rightSensorEchoPin, INPUT);
}

void loop() {  
  // Serial.println(inData);
  tryGetIncomingData();
  handleServoState();
  handleEngineState();  
  handleSensorsData();
}
