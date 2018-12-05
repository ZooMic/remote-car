const PI = 3.14159265359;
const calibration = PI / 2; // 90^o turn

export default function getNewShift (prevShift, keys, currentCarProp) {
    const { left, right, up, down } = keys;
    const { maxSpeed, speed, breakingFactor, angleSpeed } = currentCarProp;
    let { currentSpeed, currentAngle } = currentCarProp;
    let { x, y } = prevShift;



    // if ( (!left && !right) || (left && right) ) {
    //     if (currentAngle > 0) {
    //         currentAngle -= angleSpeed;
    //     } else {
    //         currentAngle += angleSpeed;
    //     }
    //     currentAngle = currentAngle < 0 ? (PI * 2) - currentAngle : currentAngle;
    //     currentAngle = currentAngle > (PI * 2) ? currentAngle - (PI * 2) : currentAngle;
    // }
    
    // else if (left && up) {
    //     currentAngle = -currentAngle;
    // } else if (right && down) {
    //     currentAngle = -currentAngle;
    // }
    if (up || down) {
        if (left) {
            currentAngle -= angleSpeed;
        }
        if (right) {
            currentAngle += angleSpeed;
        }
    }

    if ( (!up && !down) || (up && down) ) {
        if (currentSpeed > 0) {
            currentSpeed -= breakingFactor;
            currentSpeed = currentSpeed < 0 ? 0 : currentSpeed;
        } else {
            currentSpeed += breakingFactor;
            currentSpeed = currentSpeed > 0 ? 0 : currentSpeed;    
        }
    } else if (up) {
        currentSpeed += speed;
    } else if (down) {
        currentSpeed -= speed;
    }
    if (currentSpeed > 0) {
        currentSpeed = currentSpeed > maxSpeed ? maxSpeed : currentSpeed;
    } else {
        currentSpeed = -currentSpeed > maxSpeed ? -maxSpeed : currentSpeed;
    }

    x += Math.cos(currentAngle - calibration) * currentSpeed;
    y += Math.sin(currentAngle - calibration) * currentSpeed;

    return ({ x, y, currentSpeed, currentAngle });
}