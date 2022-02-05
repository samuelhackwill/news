import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Revenus } from '../imports/main.js';

import './main.html';

Template.letter.onCreated(function(){
	this.autorun(() => {
		this.subscribe('allRevenus', {
  			onReady: function () { 
				console.log("allRevenus ready")
				console.log(Revenus.find({}).fetch())
			},
			onError: function () { console.log("onError", arguments); 
			}
		});
	});
});



Template.letter.helpers({
	oneRevenu:function(){
		return Revenus.find({}, { sort: { timestamp: -1 }})
	},

});

Template.letter.events({
	"click button":function(){
		// "InputCadreLegal"
		// "InputProtectionSociale"
		// "InputMars"
		// "InputAvril"
		// "InputMai"

		obj = {}


		obj.CadreLegal = document.getElementById("InputCadreLegal").value
		obj.ProtectionSociale = document.getElementById("InputProtectionSociale").value
		obj.Mars = document.getElementById("InputMars").value
		obj.Avril = document.getElementById("InputAvril").value
		obj.Mai = document.getElementById("InputMai").value
		obj.Timestamp = new Date()

		Meteor.call("addRevenus", obj)

		document.getElementById("allinputs").style.opacity="0"
		document.getElementById("go").style.pointerEvents="none"
        
	}
});
