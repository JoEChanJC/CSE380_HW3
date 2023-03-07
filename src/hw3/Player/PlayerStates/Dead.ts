import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { PlayerTweens, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import { HW3Events } from "../../HW3Events";
/**
 * The Dead state for the player's FSM AI. 
 */
export default class Dead extends PlayerState {
    private isDying: boolean
    // Trigger the player's death animation when we enter the dead state
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(PlayerAnimations.DYING);
        this.isDying = true;
        console.log("dying")
        // this.owner.tweens.play(PlayerTweens.DEATH);
        // this.owner.animation.queue(PlayerAnimations.DEAD);
    }

    // Ignore all events from the rest of the game
    public handleInput(event: GameEvent): void { 
    }

    // Empty update method - if the player is dead, don't update anything
    public update(deltaT: number): void {
        if(this.isDying){
            console.log("play dead animation");
            this.owner.animation.queue(PlayerAnimations.DEAD, false, HW3Events.PLAYER_DEAD);
        }
    }

    public onExit(): Record<string, any> { 
        this.owner.animation.stop();
        return {};
    }
    
}