const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }
    async save(newDato){
        try{
            const data = await this.getAll();
            let id;
            data.length === 0
            ? id = 1
            : id = data[data.length-1].id+1
            data.push({...newDato,id})
            let newData = data.find(x => x.id == id);
            await fs.promises.writeFile(this.fileName,JSON.stringify(data))
            let res =[id,newData]
            return res;
        }catch(error){
            console.log('Hubo un error al guardar el articulo',error);
        }
    }
    async getAll(){
        try {
            const data = await fs.promises.readFile(this.fileName);
            return JSON.parse(data);
        } catch (error) {
            console.log('Hubo un error al mostrar la base de datos',error);
        }
    }
    async getById(numId){ 
        try{
            const data = await this.getAll();
            return data.find(x => x.id == numId);
        }catch(error){
            console.log('Hubo un error al obtener el producto seleccionado',error);
        }
    }
    async updateById(numId,newProd){
        try{
            const data = await this.getAll();
            const prod = data.find((x) => x.id == numId);
            const index = data.indexOf(prod);
            if (prod){
                let [id,timestamp] = [parseInt(numId),data[index].timestamp]
                data[index] = {...newProd,timestamp:timestamp,id:id}
                await fs.promises.writeFile(this.fileName,JSON.stringify(data))
                return data[index]
            }else{
                return null
            }
        } catch (error){
            console.log('Hubo un error al actualizar el producto seleccionado',error);
        }
    }
    async deleteById(numId){
        try {
            const data = await this.getAll();
            let res = data.find(x => x.id == numId);
            if(res === undefined){
                return null
            }else{
                let newData = data.filter((item) => item.id != numId);
                const dataJsonFinal=JSON.stringify(newData);
                await fs.promises.writeFile(this.fileName,dataJsonFinal)
                return newData
            }
        } catch (error) {
            console.log('Hubo un error al borrar el articulo seleccionado',error);
        }
    }
}

module.exports = Contenedor;





