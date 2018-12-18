#include <Servo.h>
#include <HCSR04.h>

#define servoPin 9
#define bridgePinA 7
#define bridgePinB 8
#define bridgeSpeedPin 3
#define blinkerPin 6

#define frontSensorTrigPin 5
#define frontSensorEchoPin 4

#define frontRightSensorTrigPin A4
#define frontRightSensorEchoPin A5

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

int delayer2 = 0;

void handleEngineState() {

delay(50);

  
  switch (engineState)
  {
    case Forward:
    {  
      analogWrite(bridgeSpeedPin, 190);
      digitalWrite(bridgePinA, LOW);
      digitalWrite(bridgePinB, HIGH);
      break;  
    }
    case Off:
    { 
      analogWrite(bridgeSpeedPin, 0);
      digitalWrite(bridgePinA, LOW);
      digitalWrite (bridgePinB, LOW);
      break;  
    }
     case Backward:
    {           
      analogWrite(bridgeSpeedPin, 190);
      digitalWrite(bridgePinA, HIGH);
      digitalWrite(bridgePinB, LOW);
      break;  
    }
  }
  previousEngineState = engineState;
  delayer2=0;
}


void tryGetIncomingData() {
  
  if (Serial.available() == 0) {
    return;
  }

   digitalWrite(6, HIGH);
      
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
   
    digitalWrite(6, LOW);
        
   inData ="";  
} 

int delayer = 0;
int delayer3 = 0;

void handleSensorsData() {

  double frontDistance = frontSensor.measureDistanceCm();
  double frontRightDistance = frontRightSensor.measureDistanceCm();
  double frontLeftDistance = frontLeftSensor.measureDistanceCm();
  double leftDistance = leftSensor.measureDistanceCm();
  double rightDistance = rightSensor.measureDistanceCm();
  
  Serial.print("|");
  Serial.print((int)frontDistance);
  Serial.print(":");
  Serial.print((int)frontRightDistance);
  Serial.print(":");
  Serial.print((int)frontLeftDistance);
  Serial.print(":");
  Serial.print((int)leftDistance);
  Serial.print(":");
  Serial.print((int)rightDistance);

  delayer = 0;
  delayer3 = 0;
}

void setup() {
  Serial.begin(9600);
  // Servo setup
  wheelsServo.attach(servoPin);
  engineState = Off;
  // Engine setup
  pinMode(bridgePinA, OUTPUT);
  pinMode(bridgePinB, OUTPUT);
  pinMode(bridgeSpeedPin, OUTPUT);
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
  handleEngineState();
  tryGetIncomingData();
  handleServoState();  
  handleSensorsData();

}
