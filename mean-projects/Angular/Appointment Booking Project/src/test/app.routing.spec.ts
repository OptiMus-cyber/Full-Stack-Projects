import { routes } from '../app/app-routing.module';


describe("AppRoutingModule", () => {
    it('AR1- Check whether the Catchall is provided', () => {
        let path_length:any = routes.length;
        let val = 0
        let pathGiven:any = routes[path_length - 1].path;
        let redirectTo:any = routes[path_length - 1].redirectTo;
        let pathMatch:any = routes[path_length - 1].pathMatch;
        let comp : any = '';
        if (routes[path_length - 1].component) comp = routes[path_length - 1].component;
        if (/^\*\*$/.test(pathGiven) && ((/^[\/]?services/i.test(redirectTo) && pathMatch === "full") || comp === 'ServicesComponent')) {
            val++;
        }
        expect(val).toBeGreaterThanOrEqual(1)
    })

    it('AR2- Check if routes are present', () => {
        let flag: number = 0;
        for (let element of routes) {
            if (/^[\/]?services$/i.test(element.path) && element.component.name == "ServicesComponent") {
                flag++;
            }
            if (/^[\/]?book-appointment[/]:id$/i.test(element.path) && element.component.name == "BookAppointmentComponent") {
                flag++;
            }
           
        }
        expect(flag).toBe(2);
       
        
    })
})