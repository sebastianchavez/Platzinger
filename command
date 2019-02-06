//Iniciar proyecto
ionic start platzinger sidemenu


//pages
ionic generate page about
ionic generate page conversation
ionic generate page login
ionic generate page about
ionic generate page profile
ionic generate page register


//firebase
npm install angularfire2 firebase promise-polyfill --save


//solicion get firebase
npm install rxjs@6 rxjs-compat@6 --save


//instar cordova
npm install -g cordova  


//compilar cordova en android
ionic cordova build android


//instalar pluggin camara
ionic cordova plugin add cordova-plugin-camera
npm install -–save-exact @ionic-native/camera


//correr app en dispositivo
ionic cordova run android --device


//Instalar geocaching
ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="Para obtener tus coordenadas"
npm install --save-exact @ionic-native/geolocation


//instalar vibracion
ionic cordova plugin add cordova-plugin-vibration
npm install --save-exact @ionic-native/vibration