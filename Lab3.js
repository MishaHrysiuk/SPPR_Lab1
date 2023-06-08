//Вагові коефіцієнти
const coefPrice = 0.03
const coefSize = 0.95
const coefState = 0.01
const coefDistance = 0.01

// Значення за вріантом
const houseList = [
    {
        name: "A1",
        price: 2,
        size: 3,
        state: 3,
        distanceToWork: 2
    },
    {
        name: "A2",
        price: 1,
        size: 3,
        state: 1,
        distanceToWork: 3
    },
    {
        name: "A3",
        price: 2,
        size: 3,
        state: 2,
        distanceToWork: 3
    },
    {
        name: "A4",
        price: 2,
        size: 3,
        state: 1,
        distanceToWork: 3
    },
    {
        name: "A5",
        price: 1,
        size: 3,
        state: 3,
        distanceToWork: 4
    },
    {
        name: "A6",
        price: 1,
        size: 1,
        state: 1,
        distanceToWork: 3
    },
    {
        name: "A7",
        price: 1,
        size: 2,
        state: 3,
        distanceToWork: 1
    },
    {
        name: "A8",
        price: 2,
        size: 2,
        state: 2,
        distanceToWork: 3
    },
    {
        name: "A9",
        price: 2,
        size: 2,
        state: 3,
        distanceToWork: 4
    },
    {
        name: "A10",
        price: 1,
        size: 1,
        state: 2,
        distanceToWork: 3
    }
]

const Task = (list) => {
    let kMaxPrice = 0
    let kMaxSize = 0
    let kMaxState = 0
    let kMaxDistance = 0

    console.log("Множина об’єктів")
    console.table(list)
    console.log("")

    const edgeworthParetoSet = []
    list.forEach((house, i) => {
        let flag = true;
        for (let j = 0; j < list.length; j++) {
            const notSameHouseCrit = !(house.price == list[j].price &&
                house.size == list[j].size &&
                house.state == list[j].state &&
                house.distanceToWork == list[j].distanceToWork)
            const lowerHouseCrit = (house.price <= list[j].price &&
                house.size <= list[j].size &&
                house.state <= list[j].state &&
                house.distanceToWork <= list[j].distanceToWork)
            
            if (lowerHouseCrit && notSameHouseCrit && i !== j) {
                    flag = false
                    break;
                }
        }
        if (flag) {
            edgeworthParetoSet.push(house)
        }
    })

    console.log("Ефективна множина рішень")
    console.table(edgeworthParetoSet)
    console.log("")

    edgeworthParetoSet.forEach(house => {
        house.price = +(house.price * coefPrice).toFixed(2)
        house.size = +(house.size * coefSize).toFixed(2)
        house.state = +(house.state * coefState).toFixed(2)
        house.distanceToWork = +(house.distanceToWork * coefDistance).toFixed(2)

        kMaxPrice = Math.max(kMaxPrice, house.price)
        kMaxSize = Math.max(kMaxSize, house.size)
        kMaxState = Math.max(kMaxState, house.state)
        kMaxDistance = Math.max(kMaxDistance, house.distanceToWork)
    })

    console.log("Ефективна множина рішень з урахуванням значень вагових коефіцієнтів")
    console.table(edgeworthParetoSet)
    console.log("")

    edgeworthParetoSet.forEach(house => {
        house.price = +(house.price / kMaxPrice).toFixed(2)
        house.size = +(house.size / kMaxSize).toFixed(2)
        house.state = +(house.state / kMaxState).toFixed(2)
        house.distanceToWork = +(house.distanceToWork / kMaxDistance).toFixed(2)
    })

    console.log("Нормовані значення ефективної множини рішень")
    console.table(edgeworthParetoSet)
    console.log("")

    const utilityList = edgeworthParetoSet.map((house) => {
        const utility = house.size + house.state + house.price + house.distanceToWork;
        return {
            name: house.name,
            utility
        }
    })

    console.log("Значення функцій користності")
    console.table(utilityList)
    console.log("")

    let answer = {
        utility: 0,
        name: ''
    }
    utilityList.forEach(func => {
        answer = answer.utility < func.utility ? func : answer;
    })

    console.log(`Відповідь:` )
    console.log(`Найкращий будинок для покупки: ${answer.name} = ${answer.utility}` )
}

Task(houseList)
