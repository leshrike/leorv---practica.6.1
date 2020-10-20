/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controller/controller.class.js":
/*!********************************************!*\
  !*** ./src/controller/controller.class.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const View = __webpack_require__(/*! ../view/view.class */ \"./src/view/view.class.js\");\nconst Store = __webpack_require__(/*! ../model/store.class */ \"./src/model/store.class.js\");\n\nclass Controller {\n    constructor() {\n        this.store = new Store(1);\n        this.view = new View();\n    }\n\n    addProductToStore(datosProd) {\n        \n        let product = {};\n\n        datosProd.price = Number(datosProd.price);\n\n        if (datosProd.units){\n\n            datosProd.units = Number(datosProd.units);\n        }\n\n        \n        if (datosProd.id){\n                datosProd.id=Number(datosProd.id);\n                this.changeProductInStore(datosProd);\n                this.setListeners(datosProd);\n                this.primerForm();\n                return;\n            }\n    \n        \n        datosProd.price = Number(datosProd.price);\n        if (datosProd.units) {\n            datosProd.units = Number(datosProd.units);\n        }\n        try {\n            product = this.store.addProduct(datosProd)\n        } catch (err) {\n            this.view.renderErrorMessage(err);\n            return;\n        }\n        this.view.renderNewProduct(product);\n        this.setListeners(product);\n        this.view.renderStoreImport(this.store.totalImport());\n\n    }\n\n    setListeners(product){\n\n        let id = product.id;\n\n        const up = document.querySelector('#prod-'+id+' .aumentar');\n        \n        up.addEventListener('click',(event)=>{this.changeProductStock(id,1)});\n        \n        const down = document.querySelector('#prod-'+id+' .disminuir');\n\n        down.addEventListener('click',(event)=>{this.changeProductStock(id,(-1))});\n\n        const edit = document.querySelector('#prod-'+id+' .editar');\n\n        edit.addEventListener('click',(event)=>{this.cambioForm(product)});\n\n        const eliminar = document.querySelector('#prod-'+id+' .eliminar');\n\n        eliminar.addEventListener('click',(event)=>{this.deleteProductFromStore(id)});\n\n        const resetform = document.getElementById(\"reset\");\n\n        resetform.addEventListener('click',(event)=>{this.primerForm()});\n\n    }\n\n    deleteProductFromStore(prodId) {\n        // Debemos obtener el producto para pedir confirmación\n        let product = {};\n        product = this.store.findProduct(Number(prodId));\n        if (!product) {\n            this.view.renderErrorMessage('No hay ningún producto con id ' + prodId);\n            return;\n        }\n\n        if (confirm(`Deseas borrar el producto \"${product.name}\" con id ${product.id}?`)) {\n            if (product.units) {\n                // Si tiene unidades hay que pedir una segunda confirmación\n                if (confirm(`Ese producto aún tiene ${product.units} uds. que desaparecerán. Deseas continuar?`)) {\n                    // Eliminamos sus unidades\n                    try {\n                        product = this.store.changeProductUnits({\n                            id: product.id,\n                            units: -product.units\n                        });\n                    } catch (err) {\n                        this.view.renderErrorMessage(err);\n                        return;\n                    }\n                } else {\n                    return;     // No se hace nada\n                }\n            }            \n\n            try {\n                product = this.store.delProduct(Number(prodId));\n            } catch (err) {\n                this.view.renderErrorMessage(err);\n                return;\n            }\n\n            this.view.renderDelProduct(product.id);\n            this.view.renderStoreImport(this.store.totalImport());\n        }\n    }\n\n    changeProductInStore(dataToModify) {\n        let prodModified = {};\n        try {\n            prodModified = this.store.changeProduct(dataToModify);\n        } catch (err) {\n            this.view.renderErrorMessage(err);\n            return;\n        }\n        this.view.renderEditProduct(prodModified);\n        this.view.renderStoreImport(this.store.totalImport());\n    }\n\n    changeProductStock(prodId, unitsToIncrease) {\n        let product = {};\n        try {\n            product = this.store.changeProductUnits({\n                id: Number(prodId),\n                units: Number(unitsToIncrease)\n            })\n        } catch (err) {\n            this.view.renderErrorMessage(err);\n            return;\n        }\n        this.view.renderChangeStock(product);\n\n        if (product.units > 0){\n\n            document.querySelector('#prod-'+product.id+' .disminuir').disabled=false;\n\n\n        }else{ // en caso de que las unidades del producto lleguen a 0\n\n            document.querySelector('#prod-'+product.id+' .disminuir').disabled=true;\n        }\n\n        this.view.renderStoreImport(this.store.totalImport());\n    }\n\n    cambioForm(product){\n\n        // mostrar los campos ocultos\n\n        const form_campo_ID = document.getElementById(\"form_id\");\n\n        form_campo_ID.className = form_campo_ID.className.replace(/\\boculto\\b/g,\" \");\n\n        const form_campo_units = document.getElementById(\"form_units\");\n\n        form_campo_units.className = form_campo_units.className.replace(/\\boculto\\b/g,\" \");\n\n        \n        //mostrar los datos del producto a modificar  \n\n        document.getElementById(\"l\").innerHTML = \"Editar producto\";\n        //campo de ID\n\n        let form_texto_ID = document.getElementById('prod-id');\n\n        form_texto_ID.value = product.id;\n\n        //campo de nombre\n\n        let form_texto_nombre = document.getElementById('newprod-name');\n\n        form_texto_nombre.value = product.name;\n\n        //campo del precio\n\n        let form_texto_precio = document.getElementById('newprod-price');\n\n        form_texto_precio.value = product.price;\n  \n        //cambiar el \"value del botón Añadir\"\n\n        const boton_añadir = document.getElementById(\"añadir\");\n\n        boton_añadir.innerHTML = \"Editar\";\n    }\n\n    primerForm(){\n\n        document.getElementById(\"l\").innerHTML = \"Añadir producto\";\n\n        // ocultar el campo id\n\n        const form_campo_ID = document.getElementById(\"form_id\");\n\n        form_campo_ID.classList.add(\"oculto\");\n\n        // ocultar el campo unidades\n        \n        const form_campo_units = document.getElementById(\"form_units\");\n\n        form_campo_units.classList.add(\"oculto\");\n\n        //modificar el botón\n        \n        const boton_añadir = document.getElementById(\"añadir\");\n\n        boton_añadir.innerHTML = \"Añadir\";\n    }\n\n}\n\nmodule.exports = Controller;\n\n\n//# sourceURL=webpack:///./src/controller/controller.class.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// Aquí importaremos la clase del controlador e instanciaremos uno\nconst Controller = __webpack_require__(/*! ./controller/controller.class */ \"./src/controller/controller.class.js\");\n\nconst myController = new Controller();\n\n// A continuación crearemos una función manejadora para cada formulario\nwindow.addEventListener('load', () => {\n\n  // función manejadora del formulario 'new-prod'\n  document.getElementById('new-prod').addEventListener('submit', (event) => {\n    event.preventDefault();\n\n    // Aquí el código para obtener los datos del formulario\n    \n    const id =  document.getElementById('prod-id').value;\n    const name = document.getElementById('newprod-name').value;\n    const price = document.getElementById('newprod-price').value; \n    const units = document.getElementById('prod-unidades').value;\n\n    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)\n    // pasándole como parámetro esos datos\n    myController.addProductToStore({ id, name, price, units });   \n    // Sintaxis de ES2015 que equivale a \n    //\n    // myController.addProductToStore(\n    //   { \n    //     name: name,\n    //     price: price \n    //   }\n    // ); \n  })\n\n})\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/model/product.class.js":
/*!************************************!*\
  !*** ./src/model/product.class.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Product {\n    constructor (id, name, price, units = 0) {\n        this.id = id;\n        this.name = name;\n        this.price = price;\n        this.units = units;\n    }\n\n    changeUnits(units) {\n        if (this.units + units < 0) {\n\t        throw new Error(`Quedan ${this.units} y quieres sumarle ${units}`);\n        }\n        this.units += units;\n        return this;\n    }\n\n    productImport() {\n        return this.price * this.units;\n    }\n\n    toString() {\n        return `${this.name}: ${this.units} uds. x ${this.price.toFixed(2)} €/u = ${this.productImport().toFixed(2)} €`; \n    }\n\n}\n\nmodule.exports = Product;\n\n\n//# sourceURL=webpack:///./src/model/product.class.js?");

/***/ }),

/***/ "./src/model/store.class.js":
/*!**********************************!*\
  !*** ./src/model/store.class.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Product = __webpack_require__(/*! ./product.class */ \"./src/model/product.class.js\");\n\nclass Store {\n    constructor (id) {\n\t    this.id = id;\n    \tthis.products = [];\n    }\n\n    findProduct(id) {\n        return this.products.find((prod) => prod.id === id);\n    }\n\n    addProduct(datosProd) {\n        // Comprobamos que los datos sean correctos\n        if (!datosProd.name) {\n            throw `Debes indicar el nombre del producto`;\n        }\n        if (!datosProd.price) {\n            throw `Debes indicar el precio del producto`;\n        }\n        if (datosProd.price < 0 || parseFloat(datosProd.price) !== datosProd.price) {\n            throw `El precio debe ser un número positivo (${datosProd.price})`;\n        }\n        if (datosProd.units && (datosProd.units < 0 || parseInt(datosProd.units) !== datosProd.units)) {\n            throw `Las unidades deben ser un nº entero positivo (${datosProd.units})`;\n        }\n\n        datosProd.id = getId(this.products);\n        let newProd = new Product(datosProd.id, datosProd.name, datosProd.price, datosProd.units);\n        this.products.push(newProd);\n        return newProd;\n    }\n\n    delProduct(id) {\n        let prod = {};\n        try {\n            prod = this.findProduct(id);\n        } catch(err) {\n            throw err;\n        }\n        if (prod.units) {\n            throw `Al producto con id ${id} aún le quedan ${prod.units} unidades`;\n        }\n\t\tthis.products = this.products.filter((item) => item.id !== id);\n        return prod;\n    }\n\n    changeProductUnits(datosProd) {\n        // Comprobamos que los datos sean correctos\n        if (!datosProd.id) {\n            throw `Debes indicar la id del producto`;\n        }\n        if (!datosProd.units) {\n            throw `Debes indicar las unidades del producto`;\n        }\n        if (parseInt(datosProd.units) !== datosProd.units) {\n            throw `Las unidades deben ser un nº entero (${datosProd.units})`;\n        }\n\n        let prod = {};\n        try {\n            prod = this.findProduct(datosProd.id);\n        } catch(err) {\n            throw err;\n        }\n\n        let prodChanged = {};\n        try {\n            prodChanged = prod.changeUnits(datosProd.units);\n        } catch(err) {\n            throw err;\n        }\n\n        return prodChanged;\n    }\n\n    changeProduct(datosProd) {\n        // Comprobamos que los datos sean correctos\n        if (!datosProd.id) {\n            throw `Debes indicar la id del producto`;\n        }   \n        if (datosProd.units && (datosProd.units < 0 || parseInt(datosProd.units) !== datosProd.units)) {\n            throw `Las unidades deben ser un nº entero positivo (${datosProd.units})`;\n        }\n        if (datosProd.price && (datosProd.price < 0 || parseFloat(datosProd.price) !== datosProd.price)) {\n            throw `El precio debe ser un número positivo (${datosProd.price})`;\n        }\n\n        let prod = {};\n        try {\n            prod = this.findProduct(datosProd.id);\n        } catch(err) {\n            throw err;\n        }\n\n        for (let dato of ['name', 'price', 'units']) {\n            if (datosProd[dato]) {\n                prod[dato] = datosProd[dato];\n            }\n        }\n        return prod;\n    }\n\n    totalImport() {\n        return this.products.reduce((total, prod) => total + prod.productImport(), 0);\n    }\n\n    underStock(stock) {\n        return this.products.filter((prod) => prod.units < stock);\n    }\n\n    orderByUnits() {\n        return this.products.sort((prodA, prodB) => prodB.units - prodA.units);\n    }\n\n    orderByName() {\n        return this.products.sort((prodA, prodB) => prodA.name.localeCompare(prodB.name));\n    }\n\n    toString() {\n        let cadena = `Almacén ${this.id} => ${this.products.length} productos: ${this.totalImport().toFixed(2)} €`;\n        this.products.forEach((prod) => cadena += '\\n- ' + prod);\n        return cadena;\n    }\n}\n\nfunction getId(prods) {\n    return prods.reduce((max, prod) => prod.id > max ? prod.id : max, 0) + 1;\n}\n\nmodule.exports = Store;\n\n\n//# sourceURL=webpack:///./src/model/store.class.js?");

/***/ }),

/***/ "./src/view/view.class.js":
/*!********************************!*\
  !*** ./src/view/view.class.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class View{\n    renderNewProduct(product) {\n        const $productTBodyUI = document.querySelector('#almacen tbody');\t\n\n        const $productUI = document.createElement('tr');\n        $productUI.id = 'prod-'+product.id;\n        $productUI.innerHTML = productToTr(product);\n    \n        $productTBodyUI.appendChild($productUI);\n    }\n\n    renderEditProduct(product) {\n        // Buscamos el producto\n        const $productUI = document.getElementById('prod-'+product.id);\n        if ($productUI) {            // Si está lo modificamos\n            $productUI.innerHTML = productToTr(product);\n        }\n    }\n\n    renderDelProduct(id) {\n        // Miramos si ya está el producto\n        const $productUI = document.getElementById('prod-'+id);\n        if ($productUI) {\n            $productUI.parentElement.removeChild($productUI);\n        }\n    }\n\n    renderChangeStock(product) {\n        const $productUI = document.getElementById('prod-'+product.id);\n        $productUI.children[2].textContent = product.units;\n        $productUI.children[4].textContent = product.productImport().toFixed(2)+' €';\n    }\n\n    renderStoreImport(total) {\n        document.getElementById('total').innerHTML = total.toFixed(2);\n    }\n\n    renderErrorMessage(message) {\n        const $divMessages = document.getElementById('messages');\n        $divMessages.innerHTML += `\n            <div class=\"col-sm-12 alert alert-danger\">\n                <span>${message}</span>\n                <button type=\"button\" class=\"close\" aria-label=\"Close\" onclick=\"this.parentElement.remove()\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n            </div>`;\n    }\n}\n\nfunction productToTr(product) {\n    \n    return `\n        <td>${product.id}</td>\n        <td>${product.name}</td>\n        <td>${product.units}</td>\n        <td>${product.price}</td>\n        <td>${product.productImport().toFixed(2)} €</td>\n        <td>\n        \n        <button class=\"btn btn-dark aumentar\"><span class=\"material-icons\"> arrow_drop_up </span></button>\n        <button class=\"btn btn-dark disminuir\" disabled><span class=\"material-icons\"> arrow_drop_down </span></button>\n        <button class=\"btn btn-dark editar\"><span class=\"material-icons\"> edit </span></button>\n        <button class=\"btn btn-dark eliminar\"><span class=\"material-icons\"> delete </span></button>    \n        \n        </td>`;\n}\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack:///./src/view/view.class.js?");

/***/ })

/******/ });