# **Nuclify**

**Nuclify** es un reproductor músical similar a los más exitosos servicios de música por streaming. Para poder desarrollar esta aplicación web, hemos aplicado todo lo aprendido en este Máster FullStack.

Las tecnologías más destacadas que hemos utilizado, más allá de HTML y CSS han sido _React_[1] (FrontEnd), _NodeJS_[2] (BackEnd) y _MongoDB_(BBDD)[3]. También hemos aprovechado diferentes servicios/utilidades como _Express_[4] o _Mongoose_[5] entre otr@s.

### FrontEnd

Como todos sabemos, esta es la parte visible del proyecto. La estructura, funciones visuales y el estilo de la aplicación ha sido desarrollado con el Framework de JavaScript React.

### BackEnd

El lado del servidor se ejecuta en NodeJs (JavaScript ejecutado como servidor) utilizando el framework Express. Como base de datos hemos utilizado MongoDB y su framework Mongoose.

## La aplicación

### Formularios de registro y LogIn

Lo primero que se muestra al acceder a la aplicación es el formulario de Log In. En caso de no disponer de una cuenta, disponemos la opción de crear nuestro usuario mediante el formulario de registro. Los formularios están gestionados mediante _React Hook Forms_[6].

Este es el aspecto de nuestro Login:

![Login interface](https://i.ibb.co/nLZST7f/Login.jpg)

Aquí tenemos el resultado final del formulario de _registro_:

![Register interface](https://i.ibb.co/HBqVytL/register.jpg)

Una vez accedemos a nuestra cuenta, o tras haber creado una nueva cuenta y utilizar nuestras credenciales, accedemos a nuestra aplicación. Para esto, hacemos una comprobación del correo de nuestro usuario así como la encriptación de su contraseña y se devuelve un Token _JWT_[7] que se almacenará en el _LocalStorage_ del navegador del usuario. Así tendremos constancia de que el usuario se ha logueado y permitiremos el acceso a la página principal de nuestra aplicación.

Tras validar nuestro correo y contraseña podemos ver que disponemos de un apartado para el usuario en la parte superior derecha, una barra lateral con enlace al inicio de la aplicación, la funcionalidad de búsqueda y la posibilidad de crear una playlist personalizada. Además de esto, en la parte central podemos observar las canciones, álbumes, géneros musicales y artistas. Por último podemos observar que en la parte inferior disponemos del reproductor multimedia en el cual podremos disfrutar de las canciones almacenadas en nuestra base de datos.

### Aplicación tras el LogIn

Este es el aspecto visual de nuestra aplicación una vez hemos iniciado sesión con nuestro usuario:

![Home interface](https://i.ibb.co/Thyv42s/home.jpg)

Para poder movernos entre páginas y/o componentes, hemos utilizado _ReactRouterDom_[8]. Con este servicio podemos disponer de diferentes rutas por las cuales podemos ir moviéndonos por la aplicación.

## Función de búsqueda

![Funcionalidad de buscador](https://i.ibb.co/Rg9Jc3g/Buscador.jpg)

Con esta funcionalidad podemos realizar una búsqueda en nuestra base de datos, de manera que muestre los resultados de las canciones, álbumes, artistas o géneros. De esta manera podemos seleccionar nuestra música favorita para escucharla al momento. Para ello hemos creado un contexto en React, de manera que podemos realizar una búsqueda de toda la información que hemos añadido a este contexto (canciones, álbumes, géneros y artistas).

## Reproductor

![Reproductor multimedia](https://i.ibb.co/ByRhFLd/Repro.jpg)

Para poder reproducir las canciones hemos utilizado el framework _ReactPlayer_[9]. Esta funcionalidad es capaz de reproducir tanto video como audio. Mediante el acceso a la información almacenada en nuestra base de datos, el reproductor inicia la canción que seleccionemos. Mediante sus ajustes, podemos cambiar de canción o controlar el volumen.

## Admin page

Esta función se ha realizado para poder mantener la aplicación de manera lo más sencilla posible. Hemos realizado un _CRUD_ (_Create, Read, Update Delete_) al que se puede acceder mediante software externo (como por ejemplo _Insomnia_). Para evitar depender de software de terceros, el o los usuarios que dispongan de rol de administrador podrá acceder a una página exclusiva donde podrá realizar las funciones necesarias para poder añadir, modificar o eliminar canciones, álbumes, géneros o artistas de la base de datos de la manera más sencilla posible. Este es el aspecto visual de nuestra página:

![Admin page](https://i.ibb.co/bFH3Nbk/Admin.jpg)

## Ejemplos de código

### Uso de librerías como Material UI

<div>
     <FormControl sx={{ m: 1, minWidth: 180 }}>
       <InputLabel className="categoriesContainer" id="categoriesContainer">
         CATEGORIES
       </InputLabel>
       <Select className="selectContainer">
         <MenuItem
           className="menuItem"
           onClick={() => {
             navigate('/', { replace: true });
             setRefresh(true);
           }}
           value={home}
         >
           Home
         </MenuItem>
         <MenuItem
           className="menuItem"
           onClick={() => {
             navigate('songs');
             setRefresh(true);
           }}
           value={songs}
         >
           Songs
         </MenuItem>

### Uso de distintos hooks de react como _useEffect, useState, useForm_ y _useContext_

const LoginForm = () => {
const { register, handleSubmit } = useForm();
const [errorMessage, setErrorMessage] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

useEffect(() => {
setErrorMessage('');
}, [email, password]);

const onSubmit = async (data) => {
api('POST', 'login', {
body: {
email: data.email,
password: data.password,
},
})
.then((userSession) => {
setUserSession(userSession);
if (userSession.user.role === 'ADMIN') navigate('/adminpage/songs', { replace: true });
if (userSession.user.role === 'USER') navigate('/', { replace: true });
})
.catch((error) => {
setErrorMessage('Please re-enter valid credentials');
});
};

return (

   <div className="form-container">
     <form className="input-container" onSubmit={handleSubmit(onSubmit)}>
       <label>Email address</label>
       &nbsp;
       <input
         className="form-inputs"
         {...register('email', {
           required: true,
           pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
         })}
         type="email"
         placeholder="Enter your email address"
       />

### Función para play music

const PlayListsShow = () => {
const { id } = useParams();
const { isPlaying, setIndex, indexSongs, setCountSongs, setPlayListSongs, playListSongs, setPlaying } = usePlayer();

const [listOne, setListOne] = useState([]);

useEffect(() => {
api('GET', `playlist/${id}`, {}, {}).then((data) => {
setListOne(data.song);
});
}, []);

useEffect(() => {
setPlayListSongs(listOne);
}, [listOne, playListSongs]);

useEffect(() => {
api('GET', `playlist/${id}`, {}, {}).then((data) => {
setCountSongs(playListSongs[indexSongs].soundUrl);
setPlaying(false);
});
}, [indexSongs, playListSongs]);

#### Y sus distintas funcionalidad (play, stop, next)

const handlePlayPause = () => {
setPlaying(!isPlaying);
};

const handleNext = () => {
if (playListSongs.length - 1 > indexSongs) {
setIndex(indexSongs + 1);
}
};

const handlePre = () => {
if (indexSongs > 0) {
setIndex(indexSongs);
setIndex(indexSongs - 1);
}
};

const handleProgress = (event, newProgress) => {
setProgress(newProgress);
};
const [loopset, setLoop] = useState(false);

useEffect(() => {
setPlayingQueue(countSongs);
}, [countSongs, loopset]);

const loop = () => {
if (!loopset) {
setLoop(true);
} else {
setLoop(false);
}
console.log(loopset);
};
console.log(loopset);

return (

   <div className="FooterMenuPrincipal-container">
     <ReactPlayer
       url={playingSong}
       playing={isPlaying}
       volume={valueVol / 100}
       width={400}
       height={200}
       onEnded={() => handleNext()}
       onReady={(reactPlayer) => console.log('onReady', reactPlayer.getDuration() / 60)}
       onProgress={() => handleProgress()}
       loop={loopset}
     />
     <SkipPreviousIcon onClick={handlePre} />
     <playIcon />
     {!isPlaying ? (
       <PlayCircleOutlineIcon onClick={handlePlayPause} />
     ) : (
       <PauseCircleOutlineIcon onClick={handlePlayPause} />
     )}
     <SkipNextIcon onClick={handleNext} />
     <RepeatIcon onClick={loop} />
   </div>

## Otros:

### Testing

Para diversas funcionalidades hemos utilizado el Framework de JavaScript _Jest_[10]. Esta funcionalidad nos permite indicar una serie de funcionalidades y el resultado esperado de las mismas, de modo que Jest revisa la funcionalidad, comprueba si el resultado es el esperado y nos indica si el test es correcto o si por el contrario ha fallado porque la respuesta no ha sido la esperada. Estos tests se llevan a cabo tanto en el FrontEnd como en el BackEnd.

### Librería: Material UI

_Material UI_[11] es una librería que ofrece diferentes posibilidades para mejorar de manera visual nuestra aplicación mediante componentes como iconos , desplegables o incluso calendarios. El uso de esta librería nos ha facilitado la mejora del apartado visual así como la experiencia del usuario a la hora de utilizar nuestra aplicación.

### Deployment:

La aplicación está almacenada en los servicios de _Heroku_[12] y en _SupaBase_[13]

## Tecnologías utilizadas

Aquí dejamos un listado de todas las tecnologías que hemos utilizado en el proyecto:

[1]https://es.reactjs.org/
[2]https://nodejs.org/es/
[3]https://www.mongodb.com/es
[4]https://expressjs.com/es/
[5]https://mongoosejs.com/
[6]https://react-hook-form.com/
[7]https://jwt.io/
[8]https://v5.reactrouter.com/
[9]https://www.npmjs.com/package/react-player
[10]https://jestjs.io/es-ES/
[11]https://mui.com/
[12]https://www.heroku.com/
[13]https://supabase.com/
