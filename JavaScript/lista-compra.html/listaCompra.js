// START ALL VARIABLES
var qui = document.querySelector("#who");
var que = document.querySelector("#what");

var sendIt = document.querySelector("#send");
var seeIt = document.querySelector("#see");
var resetIt = document.querySelector("#reset");

var miss = document.querySelector(".mensajes");

var removeIt = document.querySelector(".mensajes li a");

const database =
	"https://prueba-singulars2020-default-rtdb.europe-west1.firebasedatabase.app/";

getFromDatabase((where = "lista-compra.json"), (escriure = miss));

// removeFromDatabase(
// 	(where = "lista-compra/"),
// 	(id = "-MTFvCcWXn3NMhM4TTCp")
// );

// EVENTS OF BUTTONS
sendIt.addEventListener("click", () =>
	sendToDatabase(
		(where = "lista-compra.json"),
		(who = qui.value),
		(what = que.value)
	)
);

seeIt.addEventListener("click", () =>
	getFromDatabase((where = "lista-compra.json"), (escriure = miss))
);

resetIt.addEventListener("click", () =>
	resetDatabase((where = "lista-compra.json"), (escriure = miss))
);

// FUNCTIONS
//
//
// POST TO FIREBASE
function sendToDatabase(where, who, what) {
	if (!who || !what)
		return console.log("El missatge o la tenda no son válides");
	fetch(database + where, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			tienda: capitalize(who),
			item: capitalize(what),
			temp: Date.now(),
		}),
	})
		.then((res) => res.json())
		.then((res) => {
			getFromDatabase(where, miss);
		});
}

// FETCH FROM FIREBASE
function getFromDatabase(where, escriure) {
	fetch(database + where)
		.then((res) => res.json())
		.then((res) => {
			var missatges = res;
			escriure.innerHTML = "";
			// Para sortear por tienda
			sorted = [];
			for (id in missatges) {
				sorted.push({
					tienda: missatges[id].tienda,
					item: missatges[id].item,
					id_key: id,
				});
				sorted.sort((a, b) => a.tienda < b.tienda);
			}
			for (const element of sorted) {
				escriure.innerHTML += `<li data-id='${element.id_key}'><p>Comprar en ${element.tienda} el ítem: ${element.item}</p><a class="deletes" href="">Delete Message</a></li>`;
			}
			addListener();
			if (escriure.innerHTML == "")
				escriure.innerHTML += `<p>La lista de la compra está vacía</p>`;
		});
}

// ADD LISENER
function addListener() {
	document.querySelectorAll(".deletes").forEach((element) =>
		element.addEventListener("click", (event) => {
			event.preventDefault();
			let id = event.target.closest("li").dataset.id;
			removeFromDatabase("lista-compra/", id);
			event.target.closest("li").remove();
		})
	);
}

// DELETE FROM FIREBASE
function removeFromDatabase(where, id) {
	fetch(database + where + id + ".json", {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((res) => {
			// console.log(res);
		});
}

// RESET DATABASE
function resetDatabase(where, escriure) {
	fetch(database + where, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((res) => {
			// console.log(res);
			escriure.innerHTML = "";
			escriure.innerHTML += `<p>La lista de la compra está vacía!</p>`;
		});
}

// CAPITALIZE FIRST LETTER
function capitalize(s) {
	return s && s[0].toUpperCase() + s.slice(1);
}
