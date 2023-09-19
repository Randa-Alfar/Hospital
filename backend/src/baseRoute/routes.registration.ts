import path from 'path'
import fs from 'fs'
import { IRoutesRegistration } from './rout.interface';
import UserRoute from '../components/user/user.route';


class RoutesRegistaration {
        directory:string = path.join(__dirname,'../../src/components');
        registerdRoutes: IRoutesRegistration[]; 
    
    async getdirectory(){
        fs.readdir(this.directory,(err,files): Promise<IRoutesRegistration[]> | void=>{
            
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
           this.registerdRoutes = files.map(function (file) {
                return {
                    path: '/'+file+'-management',
                    router:file.charAt(0).toUpperCase() + file.slice(1)+'Router'
                }
            });
            console.log(this.registerdRoutes);
        });
        return this.registerdRoutes;
    }
}

export default RoutesRegistaration;