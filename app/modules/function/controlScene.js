export { start, stop }

function start(main) {
    main.scene.isRunning = true;
    for (let i in main.objects) {
      if (main.objects[i] === undefined || main.objects[i].body.label === "Constraint") continue;
      main.objects[i].attachFilter_All();
      main.objects[i].body.frictionAir = 0;
    }
    main.scene.engine.world.gravity.y = 1
  }
  function stop(main) {
    main.scene.isRunning = false;
    for (let i in main.objects) {
      if (main.objects[i] === undefined || main.objects[i].body.label === "Constraint") continue;
      main.objects[i].attachFilter_Mouse();
    }
    main.scene.engine.world.gravity.y = 0;
  }