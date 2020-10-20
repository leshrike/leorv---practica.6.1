const View = require('../view/view.class');
const Store = require('../model/store.class');

class Controller {
    constructor() {
        this.store = new Store(1);
        this.view = new View();
    }

    addProductToStore(datosProd) {
        
        let product = {};

        datosProd.price = Number(datosProd.price);

        if (datosProd.units){

            datosProd.units = Number(datosProd.units);
        }

        
        if (datosProd.id){
                datosProd.id=Number(datosProd.id);
                this.changeProductInStore(datosProd);
                this.setListeners(datosProd);
                this.primerForm();
                return;
            }
    
        
        datosProd.price = Number(datosProd.price);
        if (datosProd.units) {
            datosProd.units = Number(datosProd.units);
        }
        try {
            product = this.store.addProduct(datosProd)
        } catch (err) {
            this.view.renderErrorMessage(err);
            return;
        }
        this.view.renderNewProduct(product);
        this.setListeners(product);
        this.view.renderStoreImport(this.store.totalImport());

    }

    setListeners(product){

        let id = product.id;

        const up = document.querySelector('#prod-'+id+' .aumentar');
        
        up.addEventListener('click',(event)=>{this.changeProductStock(id,1)});
        
        const down = document.querySelector('#prod-'+id+' .disminuir');

        down.addEventListener('click',(event)=>{this.changeProductStock(id,(-1))});

        const edit = document.querySelector('#prod-'+id+' .editar');

        edit.addEventListener('click',(event)=>{this.cambioForm(product)});

        const eliminar = document.querySelector('#prod-'+id+' .eliminar');

        eliminar.addEventListener('click',(event)=>{this.deleteProductFromStore(id)});

        const resetform = document.getElementById("reset");

        resetform.addEventListener('click',(event)=>{this.primerForm()});

    }

    deleteProductFromStore(prodId) {
        // Debemos obtener el producto para pedir confirmación
        let product = {};
        product = this.store.findProduct(Number(prodId));
        if (!product) {
            this.view.renderErrorMessage('No hay ningún producto con id ' + prodId);
            return;
        }

        if (confirm(`Deseas borrar el producto "${product.name}" con id ${product.id}?`)) {
            if (product.units) {
                // Si tiene unidades hay que pedir una segunda confirmación
                if (confirm(`Ese producto aún tiene ${product.units} uds. que desaparecerán. Deseas continuar?`)) {
                    // Eliminamos sus unidades
                    try {
                        product = this.store.changeProductUnits({
                            id: product.id,
                            units: -product.units
                        });
                    } catch (err) {
                        this.view.renderErrorMessage(err);
                        return;
                    }
                } else {
                    return;     // No se hace nada
                }
            }            

            try {
                product = this.store.delProduct(Number(prodId));
            } catch (err) {
                this.view.renderErrorMessage(err);
                return;
            }

            this.view.renderDelProduct(product.id);
            this.view.renderStoreImport(this.store.totalImport());
        }
    }

    changeProductInStore(dataToModify) {
        let prodModified = {};
        try {
            prodModified = this.store.changeProduct(dataToModify);
        } catch (err) {
            this.view.renderErrorMessage(err);
            return;
        }
        this.view.renderEditProduct(prodModified);
        this.view.renderStoreImport(this.store.totalImport());
    }

    changeProductStock(prodId, unitsToIncrease) {
        let product = {};
        try {
            product = this.store.changeProductUnits({
                id: Number(prodId),
                units: Number(unitsToIncrease)
            })
        } catch (err) {
            this.view.renderErrorMessage(err);
            return;
        }
        this.view.renderChangeStock(product);

        if (product.units > 0){

            document.querySelector('#prod-'+product.id+' .disminuir').disabled=false;


        }else{ // en caso de que las unidades del producto lleguen a 0

            document.querySelector('#prod-'+product.id+' .disminuir').disabled=true;
        }

        this.view.renderStoreImport(this.store.totalImport());
    }

    cambioForm(product){

        // mostrar los campos ocultos

        const form_campo_ID = document.getElementById("form_id");

        form_campo_ID.className = form_campo_ID.className.replace(/\boculto\b/g," ");

        const form_campo_units = document.getElementById("form_units");

        form_campo_units.className = form_campo_units.className.replace(/\boculto\b/g," ");

        
        //mostrar los datos del producto a modificar  

        document.getElementById("l").innerHTML = "Editar producto";
        //campo de ID

        let form_texto_ID = document.getElementById('prod-id');

        form_texto_ID.value = product.id;

        //campo de nombre

        let form_texto_nombre = document.getElementById('newprod-name');

        form_texto_nombre.value = product.name;

        //campo del precio

        let form_texto_precio = document.getElementById('newprod-price');

        form_texto_precio.value = product.price;
  
        //cambiar el "value del botón Añadir"

        const boton_añadir = document.getElementById("añadir");

        boton_añadir.innerHTML = "Editar";
    }

    primerForm(){

        document.getElementById("l").innerHTML = "Añadir producto";

        // ocultar el campo id

        const form_campo_ID = document.getElementById("form_id");

        form_campo_ID.classList.add("oculto");

        // ocultar el campo unidades
        
        const form_campo_units = document.getElementById("form_units");

        form_campo_units.classList.add("oculto");

        //modificar el botón
        
        const boton_añadir = document.getElementById("añadir");

        boton_añadir.innerHTML = "Añadir";
    }

}

module.exports = Controller;
