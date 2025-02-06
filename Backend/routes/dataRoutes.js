import { addEvent, deleteEvent, editEvent, getEvents } from "../controllers/dataController.js";
import { checkLogin } from "../middlewares/checkLogin.js";

export function dataRoutes(app){

    app.post("/addevent",checkLogin,addEvent);

    app.get("/getevents/:id",getEvents);

    app.delete("/deleteevent",checkLogin,deleteEvent);

    app.put("/editevent",checkLogin,editEvent);

}