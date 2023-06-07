// Значення за варіантом
const largeBusinessFavorableGain = 450_000
const smallBusinessFavorableGain = 300_000
const patentSaleFavourableGain = 70_000
const largeBusinessUnfavorableGain = -350_000
const smallBusinessUnfavorableGain = -60_000
const patentSaleUnfavourableGain = 70_000

const consultingFirmPrice = 25_000
const consultingFirmFavorableFavorableChance = 0.85
const consultingFirmUnfavorableFavorableChance = 0.15
const consultingFirmFavorableUnfavorableChance = 0.25
const consultingFirmUnfavorableUnfavorableChance = 0.75

const A1DefectChance = 0.4
const A2DefectChance = 0.2
const A3DefectChance = 0.1
const A4DefectChance = 0.1
const A5DefectChance = 0.1
const B1DefectChance = 0.4
const B2DefectChance = 0.35
const B3DefectChance = 0.2
const B4DefectChance = 0.2
const B5DefectChance = 0.05
const eliminationDefectPrice = 120
const productCountInBatch = 20_000
const discountForBatchFromB = 1200


class Node {
    constructor(type="simple", value=0, name="", coef = 1, childrens=[]) {
        this.type = type,
        this.value = value,
        this.name = name,
        this.childrens = childrens,
        this.coef = coef
    }
}

class DecisionTreeCommon {
    PrintDecisionTree(node, indent = "") {
        console.log(indent + node.name + " (Очікуване значення: " + node.value  + 
        (node.coef !== 1 ? (", Вірогідність: " + node.coef) : "") + ")")
        if (node.childrens != null) {
            node.childrens.forEach(child => {
                this.PrintDecisionTree(child, indent + "|---")
            })
        }
    }
}

class DecisionTreeTask extends DecisionTreeCommon {
    CalculateExpectedValue(node) {
        if (node.childrens == null || node.childrens.length == 0) {
            return node.value;
        }
        else {
            let expectedValue = node.type == "max" ? -Infinity : 0
            node.childrens.forEach(child => {
                let childExpectedValue = this.CalculateExpectedValue(child);
                switch (node.type) {
                    case ("simple"):
                        expectedValue = node.value
                        break
                    case ("mod"):
                        expectedValue += childExpectedValue*child.coef
                        break
                    case ("max"):
                        expectedValue = Math.max(childExpectedValue, expectedValue);
                        break
                }
            })
            node.value += expectedValue;
            return node.value;
        }
    }
}

const Task1 = () => {
    const root = new Node("max", 0, "Основна гілка");

    const child1 = new Node("mod", 0, "Велике виробництво");
    const child2 = new Node("mod", 0, "Мале підприємство");
    const child3 = new Node("mod", 0, "Продаж патенту");

    root.childrens = [child1, child2, child3]

    const child11 = new Node("simple", largeBusinessFavorableGain, "Сприятливий стан", 0.5);
    const child12 = new Node("simple", largeBusinessUnfavorableGain, "Несприятливий стан", 0.5);

    child1.childrens = [child11, child12]

    const child21 = new Node("simple", smallBusinessFavorableGain, "Сприятливий стан", 0.5);
    const child22 = new Node("simple", smallBusinessUnfavorableGain, "Несприятливий стан", 0.5);

    child2.childrens = [child21, child22]

    const child31 = new Node("simple", patentSaleFavourableGain, "Сприятливий стан", 0.5);
    const child32 = new Node("simple", patentSaleUnfavourableGain, "Несприятливий стан", 0.5);

    child3.childrens = [child31, child32]

    return root
}

const Task2 = () => {
    const root = new Node("max", 0, "Основна гілка");

    const child1 = Task1();
    child1.name = "Не проводити огляд"
    const child2 = new Node("mod", -consultingFirmPrice, "Проводити огляд");

    root.childrens = [child1, child2]

    const child21 = new Node("max", 0, "Сприятливий прогноз", 0.75);
    const child22 = new Node("max", 0, "Несприятливий прогноз", 0.25);

    child2.childrens = [child21, child22]

    const child211 = new Node("mod", 0, "Велике виробництво");
    const child212 = new Node("mod", 0, "Мале підприємство");
    const child213 = new Node("mod", 0, "Продаж патенту");

    child21.childrens = [child211, child212, child213]

    const child2111 = new Node("simple", largeBusinessFavorableGain, "Сприятливий стан", consultingFirmFavorableFavorableChance);
    const child2112 = new Node("simple", largeBusinessUnfavorableGain, "Несприятливий стан", consultingFirmUnfavorableFavorableChance);

    child211.childrens = [child2111, child2112]

    const child2121 = new Node("simple", smallBusinessFavorableGain, "Сприятливий стан", consultingFirmFavorableFavorableChance);
    const child2122 = new Node("simple", smallBusinessUnfavorableGain, "Несприятливий стан", consultingFirmUnfavorableFavorableChance);

    child212.childrens = [child2121, child2122]

    const child2131 = new Node("simple", patentSaleFavourableGain, "Сприятливий стан", consultingFirmFavorableFavorableChance);
    const child2132 = new Node("simple", patentSaleUnfavourableGain, "Несприятливий стан", consultingFirmUnfavorableFavorableChance);

    child213.childrens = [child2131, child2132]

    const child221 = new Node("mod", 0, "Велике виробництво");
    const child222 = new Node("mod", 0, "Мале підприємство");
    const child223 = new Node("mod", 0, "Продаж патенту");

    child22.childrens = [child221, child222, child223]

    const child2211 = new Node("simple", largeBusinessFavorableGain, "Сприятливий стан", consultingFirmFavorableUnfavorableChance);
    const child2212 = new Node("simple", largeBusinessUnfavorableGain, "Несприятливий стан", consultingFirmUnfavorableUnfavorableChance);

    child221.childrens = [child2211, child2212]

    const child2221 = new Node("simple", smallBusinessFavorableGain, "Сприятливий стан", consultingFirmFavorableUnfavorableChance);
    const child2222 = new Node("simple", smallBusinessUnfavorableGain, "Несприятливий стан", consultingFirmUnfavorableUnfavorableChance);

    child222.childrens = [child2221, child2222]

    const child2231 = new Node("simple", patentSaleFavourableGain, "Сприятливий стан", consultingFirmFavorableUnfavorableChance);
    const child2232 = new Node("simple", patentSaleUnfavourableGain, "Несприятливий стан", consultingFirmUnfavorableUnfavorableChance);
    child223.childrens = [child2231, child2232]

    return root
}

const Task3 = () => {
    const root = new Node("max", 0, "Основна гілка");

    const child1 = new Node("mod", 0, "Постачальник A");
    const child2 = new Node("mod", discountForBatchFromB*5, "Постачальник B");

    root.childrens = [child1, child2]

    const maxAmountOfLosses = -(eliminationDefectPrice * productCountInBatch) 

    const child11 = new Node("simple", maxAmountOfLosses, "Виріб 1", A1DefectChance);
    const child12 = new Node("simple", maxAmountOfLosses, "Виріб 2", A2DefectChance);
    const child13 = new Node("simple", maxAmountOfLosses, "Виріб 3", A3DefectChance);
    const child14 = new Node("simple", maxAmountOfLosses, "Виріб 4", A4DefectChance);
    const child15 = new Node("simple", maxAmountOfLosses, "Виріб 5", A5DefectChance);

    child1.childrens = [child11, child12, child13, child14, child15]

    const child21 = new Node("simple", maxAmountOfLosses, "Виріб 1", B1DefectChance);
    const child22 = new Node("simple", maxAmountOfLosses, "Виріб 2", B2DefectChance);
    const child23 = new Node("simple", maxAmountOfLosses, "Виріб 3", B3DefectChance);
    const child24 = new Node("simple", maxAmountOfLosses, "Виріб 4", B4DefectChance);
    const child25 = new Node("simple", maxAmountOfLosses, "Виріб 5", B5DefectChance);

    child2.childrens = [child21, child22, child23, child24, child25]

    return root
}

const showResult = (task, num) => {

    const decisionTreeTask = new DecisionTreeTask();
    decisionTreeTask.CalculateExpectedValue(task);
    console.log(`Завдання №${num}`)
    decisionTreeTask.PrintDecisionTree(task);
    console.log("")
}

showResult(Task1(), 1)
showResult(Task2(), 2)
showResult(Task3(), 3)


