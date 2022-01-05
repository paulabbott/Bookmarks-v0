async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export default async function validateField(url, validationRules) {
    let messages = []
    let passedAllSoFar = true
    await asyncForEach(validationRules, async (rule) => {
        if (passedAllSoFar) {
            const result = await rule(url);
            console.log('result=', result);
            if (!result.passed) {
                messages.push(result)
                passedAllSoFar = false
            }
        }
    })
    console.log('passedAllSoFar=', passedAllSoFar);
    return { passedAll: passedAllSoFar, messages: messages }
}

