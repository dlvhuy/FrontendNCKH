import { camelCase, snakeCase } from 'lodash';
import moment from 'moment';
import { cloneObj } from '@app/common/functionCommons';
import { Education_SYSTEM2, GRADUATION_CLASSIFICATION, UNIVERSITY_MAJOR_SYSTEM } from '@constants';

export function extractIds(listData) {
  return listData?.map(element => element._id);
}

export function extractKeys(listData, key) {
  return listData?.map(element => element[key]);
}

export function groupBy(list, key) {
  return list.reduce(function(grouped, element) {
    (grouped[element[key]] = grouped[element[key]] || []).push(element);
    return grouped;
  }, {});
}

export function gpaConvertToClassification(gpa) {

  console.log(gpa)
  if (gpa >= 3.6) {
    return GRADUATION_CLASSIFICATION.find(c => c.value === "Excellent");
  } else if (gpa >= 3.0) {
    return GRADUATION_CLASSIFICATION.find(c => c.value === "VeryGood");
  } else if (gpa >= 2.5) {
    return GRADUATION_CLASSIFICATION.find(c => c.value === "Good");
  } else if (gpa >= 2.0) {
    return GRADUATION_CLASSIFICATION.find(c => c.value === "Average");
  } else {
    return GRADUATION_CLASSIFICATION.find(c => c.value === "Weak");
  }
}

export function valueToNameClassification(value) {
  return GRADUATION_CLASSIFICATION.find(c => c.value === value);
}

export function valueToMajor(value) {
  return UNIVERSITY_MAJOR_SYSTEM.find(c => c.value === value);
}

export function sortThuTu(a, b) {
  return a.thuTu - b.thuTu;
}

export function buildTree(allData, parentKey) {
  let congTyTreeForAdmin = [];
  congTyTreeForAdmin = createDataTree(allData, '_id', parentKey);
  return congTyTreeForAdmin;
}

export function createDataTree(dataset, idProperty, parentKey, sortFunction = sortThuTu) {
  const hashTable = Object.create(null);
  dataset.forEach(aData => hashTable[aData[idProperty]] = { ...aData, children: [] });
  const dataTree = [];
  dataset.forEach(aData => {
    if (aData[parentKey] && hashTable[aData[parentKey]]) {
      if (hashTable[aData[idProperty]]?.thuTu) {
        hashTable[aData[idProperty]].index = [hashTable[aData[parentKey]]?.index, hashTable[aData[idProperty]]?.thuTu].join('.');
      }
      hashTable[aData[parentKey]].children.push(hashTable[aData[idProperty]]);
    } else {
      if (hashTable[aData[idProperty]]?.thuTu) {
        hashTable[aData[idProperty]].index = hashTable[aData[idProperty]]?.thuTu;
      }
      dataTree.push(hashTable[aData[idProperty]]);
    }
  });
  return sortTree(dataTree, sortFunction);
}

export function sortTree(tree, sortFunction = sortThuTu) {
  const orgTree = tree.sort(sortFunction);
  let stackNodes = [...tree];
  while (stackNodes.length > 0) {
    const last = stackNodes.pop();
    if (last.children && last.children.length > 0) {
      last.children = last.children.sort(sortFunction);
      stackNodes.push(...last.children);
    }
  }
  return orgTree;
}


//--------------------------------------------------------------------
export function convertSnakeCaseToCamelCase(dataInput) {
  if (typeof dataInput === 'object') {
    if (Array.isArray(dataInput)) {
      let objOutput = [];
      dataInput.forEach(item => {
        objOutput = [...objOutput, convertSnakeCaseToCamelCase(item)];
      });
      return objOutput;
    } else {
      return convertObjectToCamelCase(dataInput);
    }
  }
  return dataInput;
}

export function convertObjectToCamelCase(objInput) {
  if (!objInput) return objInput;
  const objOutput = {};
  Object.entries(objInput).forEach(([key, value]) => {
    if (key === 'extra') {
      objOutput[key] = value;
    } else {
      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          // array
          objOutput[camelCase(key)] = convertSnakeCaseToCamelCase(value);
        } else {
          // object
          objOutput[camelCase(key)] = convertObjectToCamelCase(value);
        }
      } else {
        if (key === '_id') {
          objOutput._id = value;
          objOutput.key = value;
        } else {
          objOutput[camelCase(key)] = value;
        }
      }
    }
  });
  return objOutput;
}

//--------------------------------------------------------------------
export function convertCamelCaseToSnakeCase(dataInput) {
  dataInput = cloneObj(dataInput);
  if (typeof dataInput === 'object') {
    if (Array.isArray(dataInput)) {
      let objOutput = [];
      dataInput.forEach(item => {
        objOutput = [...objOutput, convertCamelCaseToSnakeCase(item)];
      });
      return objOutput;
    } else {
      return convertObjectToSnakeCase(dataInput);
    }
  }
  return dataInput;
}

export function convertObjectToSnakeCase(objInput) {
  if (!objInput) return objInput;
  objInput = cloneObj(objInput);
  const objOutput = {};
  Object.entries(objInput).forEach(([key, value]) => {
    if (key === 'extra' || key === '_id') {
      objOutput[key] = value;
    } else {
      if (typeof value === 'object') {
        if (moment.isMoment(value)) {
          objOutput[snakeCase(key)] = value;
        } else if (Array.isArray(value)) {
          // array
          objOutput[snakeCase(key)] = convertCamelCaseToSnakeCase(value);
        } else {
          // object
          objOutput[snakeCase(key)] = convertObjectToSnakeCase(value);
        }
      } else {
        if (key === '_id') {
          objOutput._id = value;
        } else {
          objOutput[snakeCase(key)] = value !== undefined ? value : null;
        }
      }
    }
  });
  return objOutput;
}

//--------------------------------------------------------------------
