// START ALL VARIABLES
var qui = document.querySelector("#who");
var que = document.querySelector("#what");

var qui_edit = document.querySelector("#who_edit");
var que_edit = document.querySelector("#what_edit");

var sendIt = document.querySelector("#send");
var seeIt = document.querySelector("#see");
var resetIt = document.querySelector("#reset");
var patchIt = document.querySelector("#patch");

var miss = document.querySelector(".mensajes");

var removeIt = document.querySelector(".mensajes li a");

const database =
	"https://prueba-singulars2020-default-rtdb.europe-west1.firebasedatabase.app/";

getFromDatabase((where = "lista-compra.json"), (escriure = miss));

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

patchIt.addEventListener("click", () =>
	patchDatabase(
		(where = "lista-compra/"),
		(who = qui_edit.value),
		(what = que_edit.value),
		(id = id)
	)
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
			// escribo todos los elementos con dos enlaces,para modificar el elemento y para eliminarlo
			for (const element of sorted) {
				escriure.innerHTML += `<li data-id='${element.id_key}'><p>Comprar en <span class="tienda">${element.tienda}</span> el ítem: <span class="item">${element.item}</span></p><a class="open" href="">Modificar elemento</a><a class="deletes" href="">Eliminar Elemento</a></li>`;
			}
			addListener();
			if (escriure.innerHTML == "")
				escriure.innerHTML += `<p>La lista de la compra está vacía!</p>`;
		});
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

// PATCH DATABASE
function patchDatabase(where, who, what, id) {
	fetch(database + where + id + ".json", {
		method: "PATCH",
		body: JSON.stringify({
			tienda: capitalize(who),
			item: capitalize(what),
			temp: Date.now(),
		}),
	})
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
		});
	// para poner el valor previo en buen formato en el ligthbox
	document.querySelector(
		`li[data-id="${id}"] span.item`
	).innerHTML = capitalize(que_edit.value);

	document.querySelector(
		`li[data-id="${id}"] span.tienda`
	).innerHTML = capitalize(qui_edit.value);
}

// ADD LISENER
function addListener() {
	// agrego listeners a todos los enlaces para eliminar
	document.querySelectorAll(".deletes").forEach((element) =>
		element.addEventListener("click", (event) => {
			event.preventDefault();
			let id = event.target.closest("li").dataset.id;
			removeFromDatabase("lista-compra/", id);
			event.target.closest("li").remove();
		})
	);
	// agrego listener a todos los enlaces para modificar
	document.querySelectorAll(".open").forEach((element) =>
		element.addEventListener("click", (event) => {
			event.preventDefault();
			id = event.target.closest("li").dataset.id;

			que_edit.value = document.querySelector(
				`li[data-id="${id}"] span.item`
			).innerHTML;
			qui_edit.value = document.querySelector(
				`li[data-id="${id}"] span.tienda`
			).innerHTML;

			modal.style.display = "block";
		})
	);
}

// CAPITALIZE FIRST LETTER
function capitalize(s) {
	return s && s[0].toUpperCase() + s.slice(1);
}

// LIGTHBOX
// Get the modal
var modal = document.querySelector("#myModal");

// Get the <span> element that closes the modal
var span = document.querySelector(".close");

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
