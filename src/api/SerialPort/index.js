
import { ipcRenderer } from 'electron';

export default {
    list: async () => {
        try{
            let result = await ipcRenderer.invoke("SerialPort.list");
            return result;
        }catch(err){
            throw (err);
        }
    }
}