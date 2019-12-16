import axios from 'axios';
/* Endereços para cada emulador/simulador:
** Genymotion:              http://10.0.3.2:3333/
** Emulador Android Studio: http://10.0.2.2:3333/
** Simulador IOS:           http://localhost:3333/
*/
const api = axios.create({
    baseURL: 'http://sistemas.luvep.com.br/gestaodeclientes/slim/',
    // baseURL: 'http://localhost/gestaodeclientes/slim/',
    // transformResponse: [function (response) {
    // // Do whatever you want to transform the data
    //     console.log(response)        
    //     if(response.errors != '')
    //         throw response;
    //     else 
    //         return response;
        
        
    // }],
    // timeout: 10000,
    // responseType: 'json'
    // httpAgent: new http.Agent({ keepAlive: true }),
    // httpsAgent: new https.Agent({ keepAlive: true }),
});



export default api;