//保存
//var hostURL = "https://two-sim.herokuapp.com";
import {checkRange} from "./checkRange"
import {roundFloat} from "./roundFloat"

export function save(main,objects) {
    
    var hostURL = "http://localhost:8000";
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
        if (objects[i].label === "Constraint") {
            var tmp = {
                "type": objects[i].label,
                "x": nextIdMap[objects[i].bodyA.id],
                "y": nextIdMap[objects[i].bodyB.id],
                "color": "white",
                "isStatic": true,
                "angle": roundFloat(objects[i].pointA.x, 4),
                "density": roundFloat(objects[i].pointA.y, 4),
                "restitution": roundFloat(objects[i].pointB.x, 4),
                "data1": roundFloat(objects[i].pointB.y, 4),
                "data2": 0
            }
        }
        else {
            /*//範囲外なら保存しない
            if (checkRange(main,objects[i])) //TODO 片方消えた時のconstraint
                continue;
            */
            var { data1, data2 } = obj2data(objects[i]);
            if (data1 === -1) continue;
            var tmp = {
                "type": objects[i].label,
                "x": roundFloat(objects[i].position.x, 4),
                "y": roundFloat(objects[i].position.y, 4),
                "color": objects[i].render.fillStyle,
                "isStatic": objects[i].isStatic,
                "angle": roundFloat(objects[i].angle, 3),
                "density": roundFloat(objects[i].density, 3),
                "restitution": roundFloat(objects[i].restitution, 4),
                "data1": roundFloat(data1, 2),
                "data2": roundFloat(data2, 2)
            }
            nextIdMap[objects[i].id] = nextIdCnt;
        }
        data.push(tmp);
        nextIdCnt++;
    }
    var hostUrl = hostURL + "/making/save";

    $.ajax({
        url: hostUrl,
        type: "POST",
        data: { "data": data, "sceneInfo": sceneInfo },
        dataType: "text",
        scriptCharset: "utf-8",
        timeout: 3000
    }
    ).then(
        (data) => {
            console.log("ok")
            window.location.href = hostURL + "/scenes/" + data;
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
  