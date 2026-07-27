// =====================================
// LifeHub V3
// Move Actions
// =====================================

Tasks.exitMoveMode = function(){

    this.moveMode = false;

    this.moveTask = null;

    document.body.classList.remove(
        "matrix-move-active"
    );

    const panel =
        document.getElementById(
            "movePanel"
        );

    if(panel){

        panel.classList.add(
            "hidden"
        );

    }

    document
        .querySelectorAll(".matrix-card")
        .forEach(card=>{

            card.classList.remove(
                "move-target"
            );

        });

    document
        .querySelectorAll(".task-preview")
        .forEach(item=>{

            item.classList.remove(
                "move-selected"
            );

        });

};

Tasks.moveToPriority = function(priority){

    if(!this.moveTask){

        this.exitMoveMode();

        return;

    }

    const task =
        this.items.find(
            t=>t.id===this.moveTask
        );

    if(!task){

        this.exitMoveMode();

        return;

    }

    task.priority = priority;

    this.save();

    this.renderMatrix();

    this.exitMoveMode();

};

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        const cancel =
            document.getElementById(
                "cancelMove"
            );

        if(cancel){

            cancel.onclick = ()=>{

                Tasks.exitMoveMode();

            };

        }

    }
);
