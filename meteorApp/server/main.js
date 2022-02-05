import { Meteor } from 'meteor/meteor';
import { Revenus } from '../imports/main.js';
import { WebApp } from 'meteor/webapp';
Revenus = Revenus

const serverRendering = (req, res, next) => 
{

	// can get the useragent this way
	rootUrl = "https://news.shh.ovh"
	timestamp = new Date()
	// page = req.url
	// console.log("serverRendering launching ", req.headers['user-agent'])
	console.log(timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds())
	// console.log("full REQ ", req)
	console.log("REQ url ", req.url)
	
	// console.log("which page svp? ", page)
	// i guess i can get the URL this way?
    try 
    {
	    const ua = req.headers['user-agent'];

	    if (/bot|whatsapp|facebook|twitter|pinterest|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex/i.test(ua)) 
	    {

			if(req.url!=="/"){
				console.log("not accessing root")
				zob = req.url
				console.log("page number", zob)
			}else{
				// show page 1 preview for root
				console.log("accessing root! page 1")
			}

			console.log("THATS A BOT, user agent : ", ua)

		      const html = `
		        <!html>
		        <head>
		          <title>sam's newsletter</title>
		          <meta property="og:image" content="https://news.shh.ovh/images/cemetary.jpg"/>
		          <meta property="og:image:url" content="https://news.shh.ovh/images/cemetary.jpg"/>
		          <meta property="og:image:secure_url" content="https://news.shh.ovh/images/cemetary.jpg"/>
		          <meta property="og:image:type" content="image/jpeg"/>
		          <meta property="og:image:width" content="2524" />
					<meta property="og:image:height" content="1942" />
		          <meta property="og:url" content="https://news.shh.ovh"/>
		          <meta property="og:type" content="website"/>
		          <meta property="og:description" content="Aux serviteurs qui entraient, il ne cessait de dire: 'mes gentils, mes bien-aimés, pourquoi est-ce que vous me servez, et est-ce que je le mérite, qu'on me serve?[...]"/>
		          <meta property="og:title" content="la newsletter de Samuel Hackwill, numéro 6 du mois de Novembre 2020."/>
		      `;


		      res.statusCode = 200;
		      res.setHeader('Content-Type', 'text/html');
		      res.end(html);
	    } else {
	      console.log("not a bot, carry on")
	      next();
	    }
	} catch (err) {
    console.log(err);
  }
}

// attach the handler to webapp
WebApp.connectHandlers.use(serverRendering);


Meteor.startup(() => {
  // code to run on server at startup
  if (Revenus.findOne()==undefined) {
  	Revenus.insert({legal:"intermittent fr", social:"chômage les trois mois", mars:1463, avril:1564, mai:1513, timestamp:new Date()})
  }
});

if (Meteor.isServer) {
  
  Meteor.publish('allRevenus', function() {
    return Revenus.find();
  });
}

Meteor.methods({
	addRevenus(obj){
		Revenus.insert({legal:obj.CadreLegal, social:obj.ProtectionSociale, mars:obj.Mars, avril:obj.Avril, mai:obj.Mai, timestamp:obj.Timestamp})
	},

	removeEverything(){
		Revenus.remove({})
	}
})

