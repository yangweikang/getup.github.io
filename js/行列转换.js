function row2col(jsonData, idCol, valCol, keyCol, emptyValue) {
    var result = [], //存储返回的数据
        idIndexData = {}, //存储id在数组中的信息(位置)
        resultColumns = {}, //存储列名数据
        curRecord = null; //存储当前数据
    var valCols = valCol.split(','); //
    // 循环整个JSON数组
    for (let jsonItem of jsonData) {
        //根据主键值，查找到结果数组中的索引号
        var idValue = jsonItem[idCol];
        var num = idIndexData[idValue]; //获取存储该id的数组索引号
        if (num != null) {
            curRecord = result[num];
        } else {
            //初始化数据时保持完整的结构信息 避免因为缺乏数据，缺乏指定的列数据
            curRecord = {};
        }
        // 指定的valCols列下的数据作为y轴，则取出该列的数据作为y轴即可
        for (var i in valCols) {
            var key = valCols[i];
            //获取到colField的值，作为列名
            var value = jsonItem[keyCol];
            curRecord[value] = jsonItem[key];
            //存储列名
            resultColumns[value] = null;
            break;
        }
        //除数据内容外，还需要添加主键数据  
        curRecord[idCol] = idValue;
        //对象若为新建 则新增进数组
        if (num == null) {
            idIndexData[idValue] = result.push(curRecord) - 1;
        }
    }
    //数据检查 由于是将行数据作为列名，则可能会存在部分行缺少其他列数据，若缺少，则指定默认值
    for (var i in result) {
        for (var name in resultColumns) {
            if (!result[i].hasOwnProperty(name)) result[i][name] = emptyValue;
        }
    }
    return result;
}