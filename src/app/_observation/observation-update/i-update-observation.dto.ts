import { IAuthUser } from "src/app/_auth/i-auth-user.dto";
import { IBirdSummary } from "src/app/_bird/i-bird-summary.dto";
import { IObservationPosition } from "src/app/_map/i-observation-position.dto";
import { IObservationNote } from "src/app/_observation-note/i-observation-note.dto";

export interface IUpdateObservation {
    observationId: number;
    quantity: number;
    observationDateTime: Date; //| string; --> not when posting to the server...
    // birdId: number;
    bird: IBirdSummary;
    user: IAuthUser;
    position: IObservationPosition;
    notes: IObservationNote[];
}