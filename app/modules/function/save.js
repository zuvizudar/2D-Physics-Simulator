//保存
//var hostURL = "https://two-sim.herokuapp.com";
import {checkRange} from "./checkRange"
import {roundFloat} from "./roundFloat"

export function save(objects) {
    //var hostURL = "http://localhost:8000";
    const hostURL = "https://sim-maker.herokuapp.com";
    const apiURL = hostURL + "/making/save";

    var sceneInfo = [], data = [], nextIdMap = [], nextIdCnt = 2;
    for (var i = 0; i < 4; i++) {
        var c = document.forms.saveForm.elements[i];
        if (i === 3)
            sceneInfo.push(c.checked);
        else
            sceneInfo.push(c.value);
    }
    for (let i = 1; i < objects.length; i++) {
        if (objects[i] === undefined) {
            continue;
        }
        if (objects[i].body.label === "Constraint") {
            var tmp = {
                "type": objects[i].body.label,
                "x": nextIdMap[objects[i].body.bodyA.id],
                "y": nextIdMap[objects[i].body.bodyB.id],
                "color": "white",
                "isStatic": true,
                "angle": roundFloat(objects[i].body.pointA.x, 4),
                "density": roundFloat(objects[i].body.pointA.y, 4),
                "restitution": roundFloat(objects[i].body.pointB.x, 4),
                "data1": roundFloat(objects[i].body.pointB.y, 4),
                "data2": 0
            }
        }
        else {
            /*//範囲外なら保存しない
            if (checkRange(main,objects[i].body)) //TODO 片方消えた時のconstraint
                continue;
            */
            var { data1, data2 } = obj2data(objects[i].body);
            if (data1 === -1) continue;
            var tmp = {
                "type": objects[i].body.label,
                "x": roundFloat(objects[i].body.position.x, 4),
                "y": roundFloat(objects[i].body.position.y, 4),
                "color": objects[i].body.render.fillStyle,
                "isStatic": objects[i].body.isStatic,
                "angle": roundFloat(objects[i].body.angle, 3),
                "density": roundFloat(objects[i].body.density, 3),
                "restitution": roundFloat(objects[i].body.restitution, 4),
                "data1": roundFloat(data1, 2),
                "data2": roundFloat(data2, 2)
            }
            if(objects[i].body.role == "Player"){
                tmp.data3 = 0 ;//player
            }
            else if(objects[i].body.role == "Bumper"){
                tmp.data3 = 1; //bumper
            }
            nextIdMap[objects[i].body.id] = nextIdCnt;
        }
        data.push(tmp);
        nextIdCnt++;
    }

    $.ajax({
        url: apiURL,
        type: "POST",
        data: { "data": data, "sceneInfo": sceneInfo },
        dataType: "json",
        scriptCharset: "utf-8",
        timeout: 3000
    }
    ).then(
        (data) => {
            if(data.status=="OK")
                window.location.href = hostURL + "/scenes/" + data;
            else{
                console.log(data);
            }
        },
        (XMLHttpRequest, textStatus, errorThrown) => {
            console.log("error");
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        }
    )
}


function obj2data(obj) {//dataは(width,height) or (rad,null)とか
    var data1, data2;
    switch (obj.label) {
      case 'Circle Body':
        data1 = obj.circleRadius;
        break;
      case 'Rectangle Body':
      case 'Square Body':
      case 'Bar Body':
        //data1 = obj.width;
        //data2 = obj.height;
        data1 = getDis(obj.vertices[0], obj.vertices[1]);
        data2 = getDis(obj.vertices[0], obj.vertices[3]);
        break;
      case 'Triangle Body':
        data1 = obj.rad;
        break;
      default:
        data1 = -1;
    }
    return { data1, data2 };
  }
  function getDis(obj1, obj2) {
    return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
  }
  