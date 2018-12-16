
const mapKeys = (keys) => {

    let steeringString = "";

    if (keys.left) {
        steeringString = steeringString.concat('l'); // turn left
    } else if (keys.right) {
        steeringString = steeringString.concat('r'); // turn right
    } else {
        steeringString = steeringString.concat('s'); // straight wheels
    }

    if (keys.up) {
        steeringString = steeringString.concat('f'); // go forward
    } else if (keys.down) {
        steeringString = steeringString.concat('b'); // go backwards
    } else {
        steeringString = steeringString.concat('o'); // engine off
    }
    
    return steeringString;
}

module.exports = {
    mapKeys
};