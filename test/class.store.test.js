const Store = require('../src/model/store.class');

test('Existe la clase Store', () => {
	expect(Store).toBeDefined();
});

test('crea un almacén', () => {
    let alm1=new Store(2);
	expect(alm1.id).toBe(2);
	expect(alm1.products).toEqual([]);
});


test('crea un producto en el almacén', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
	expect(hecho).toBeTruthy();
	expect(almacen.products.length).toBe(1);
	expect(almacen.products[0]).toEqual({id: 1, name: 'Producto 2', price: 12.56, units: 0});
});

test('no crea un producto sin nombre', () => {
	let almacen=new Store(1);
	expect(() => almacen.addProduct({name: '', price: 12.56})).toThrow();
	expect(almacen.products.length).toBe(0);
});

test('no crea un producto sin precio', () => {
	let almacen=new Store(1);
	expect(() => almacen.addProduct({name: 'Product 1'})).toThrow();
	expect(almacen.products.length).toBe(0);
});

test('no crea un producto si precio no es nº', () => {
	let almacen=new Store(1);
	expect(() => almacen.addProduct({name: 'Product 1', price: 'asd'})).toThrow();
	expect(almacen.products.length).toBe(0);
});

test('no crea un producto si precio es negativo', () => {
	let almacen=new Store(1);
	expect(() => almacen.addProduct({name: 'Product 1', price: -12})).toThrow();
	expect(almacen.products.length).toBe(0);
});

test('no crea un producto si unidades no es nº', () => {
	let almacen=new Store(1);
	expect(() => almacen.addProduct({name: 'Product 1', price: 12, units: 'asd'})).toThrow();
	expect(almacen.products.length).toBe(0);
});

test('no crea un producto si unidades es negativo', () => {
	let almacen=new Store(1);
	expect(() => almacen.addProduct({name: 'Product 1', price: 12, units: -12})).toThrow();
	expect(almacen.products.length).toBe(0);
});

test('no crea un producto si unidades no es entero', () => {
	let almacen=new Store(1);
	expect(() => almacen.addProduct({name: 'Product 1', price: 12, units: 1.12})).toThrow();
	expect(almacen.products.length).toBe(0);
});

test('crea dos productos en el almacén', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
    hecho=almacen.addProduct({name:"Producto 3", price: 0.12});
	expect(hecho).toBeTruthy();
	expect(almacen.products.length).toBe(2);
	expect(almacen.products[1]).toEqual({id: 2, name: 'Producto 3', price: 0.12, units: 0});
});

test('encuentra un producto', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
    hecho=almacen.addProduct({name:"Producto 3", price: 0.12});
    let prod=almacen.findProduct(2);
	expect(prod).toEqual({id: 2, name: 'Producto 3', price: 0.12, units: 0});
});

test('no encuentra un producto', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
    hecho=almacen.addProduct({name:"Producto 3", price: 0.12});
	expect(almacen.findProduct(5)).toBeFalsy();
});

test('no borra un producto con unidades', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
	almacen.findProduct(1).changeUnits(5);
	expect(() => almacen.delProduct(1)).toThrow();
	expect(almacen.products.length).toBe(1);
});

test('no borra un producto que no existe', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
    hecho=almacen.addProduct({name:"Producto 3", price: 0.12});;
	expect(() => almacen.delProduct(8)).toThrow();
	expect(almacen.products.length).toBe(2);
});

test('sí borra un producto sin unidades', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
    hecho=almacen.addProduct({name:"Producto 3", price: 0.12});
	expect(almacen.delProduct(2)).toEqual({id: 2, name: 'Producto 3', price: 0.12, units: 0});
	expect(almacen.products.length).toBe(1);
});

test('no cambia un producto si no se le pasa una id', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
	expect(() => almacen.changeProduct({name: 'asd'})).toThrow();
	expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
});

test('no cambia un producto si precio no es nº', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
	expect(() => almacen.changeProduct({id:1, price: 'asd'})).toThrow();
	expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
});

test('no cambia un producto si precio es negativo', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
	expect(() => almacen.changeProduct({id:1, price: -12})).toThrow();
	expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
});

test('no cambia un producto si unidades no es nº', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
	expect(() => almacen.changeProduct({id:1, units: 'asd'})).toThrow();
	expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
});

test('no cambia un producto si unidades es negativo', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56, units: 5});
	expect(() => almacen.changeProduct({id:1, units: -2})).toThrow();
	expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 5}]);
});

test('no cambia un producto si unidades no es entero', () => {
	let almacen=new Store(1);
    let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
	expect(() => almacen.changeProduct({id:1, units: 2.2})).toThrow();
	expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
});

test('Ordena alfabéticamente',() => {
	let alm2=new Store(2);
	alm2.addProduct({name: 'Ñu', price: 12.56, units: 5});
	alm2.addProduct({name: 'Zzz', price: 12.56});
	alm2.addProduct({name: 'Çcc', price: 12.56, units: 25});
	alm2.addProduct({name: 'Éza', price: 12.56});
	alm2.addProduct({name: 'Egb', price: 12.56, units: 8});
	alm2.addProduct({name: 'erc', price: 12.56, units: 12});
	alm2.addProduct({name: 'afzz', price: 12.56, units: 2});
	alm2.addProduct({name: 'Ábzz', price: 12.56, units: 4});
	alm2.addProduct({name: 'Adzz', price: 12.56});
	expect(alm2.orderByName().map(item=>item.name)).toEqual(
		[ "Ábzz", "Adzz", "afzz", "Çcc", "Egb", "erc", "Éza", "Ñu", "Zzz"]
	);
});

test('Ordena por unidades',() => {
	let alm2=new Store(2);
	alm2.addProduct({name: 'Ñu', price: 12.56, units: 5});
	alm2.addProduct({name: 'Zzz', price: 12.56});
	alm2.addProduct({name: 'Çcc', price: 12.56, units: 25});
	alm2.addProduct({name: 'Éza', price: 12.56});
	alm2.addProduct({name: 'Egb', price: 12.56, units: 8});
	alm2.addProduct({name: 'erc', price: 12.56, units: 12});
	alm2.addProduct({name: 'afzz', price: 12.56, units: 2});
	alm2.addProduct({name: 'Ábzz', price: 12.56, units: 4});
	alm2.addProduct({name: 'Adzz', price: 12.56});

	expect(alm2.orderByUnits().map(item=>item.units)).toEqual(
		[25, 12, 8, 5, 4, 2, 0, 0, 0]
	);
});

test('Lista stock bajo',() => {
	let alm2=new Store(2);
	alm2.addProduct({name: 'Ñu', price: 12.56, units: 5});
	alm2.addProduct({name: 'Zzz', price: 12.56});
	alm2.addProduct({name: 'Çcc', price: 12.56, units: 25});
	alm2.addProduct({name: 'Éza', price: 12.56});
	alm2.addProduct({name: 'Egb', price: 12.56, units: 8});
	alm2.addProduct({name: 'erc', price: 12.56, units: 12});
	alm2.addProduct({name: 'afzz', price: 12.56, units: 2});
	alm2.addProduct({name: 'Ábzz', price: 12.56, units: 4});
	alm2.addProduct({name: 'Adzz', price: 12.56});

	expect(alm2.underStock(5).map(item=>item.units)).toEqual(
		[0, 0, 2, 4, 0]
	);
});
