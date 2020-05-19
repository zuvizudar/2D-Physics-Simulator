import { attachFilter_All, attachFilter_Mouse } from "./attachFilter"

export { start, stop }

function start(main) {
    main.scene.isRunning = true;
    for (let i in main.objects) {
      if (main.objects[i] === undefined || main.objects[i].label === "Constraint") continue;
      attachFilter_All(main.objects[i])
      main.objects[i].frictionAir = 0;
    }
    main.scene.engine.world.gravity.y = 1
  }
  function stop(main) {
    main.scene.isRunning = false;
    for (let i in main.objects) {
      if (main.objects[i] === undefined || main.objects[i].label === "Constraint") continue;
      attachFilter_Mouse(main.objects[i]);
    }
    main.scene.engine.world.gravity.y = 0;
  }