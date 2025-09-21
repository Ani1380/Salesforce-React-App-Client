/* @description : This class is used to hold different constants accross the app.
 * @author : Anirban Karmakar
 * @Created Date: 20/09/2025
 * */

export function getPriorityClass(todoPriority){
 
    const lowPriorityClass = 'low-priority';
    const medPriorityClass = 'medium-priority';
    const highPriorityClass = 'high-priority';

    var priority;
    console.log(todoPriority);
    
    if(todoPriority === 'Low'){
        priority = lowPriorityClass;
    } else if(todoPriority === 'Medium'){
        priority = medPriorityClass;
    } else if(todoPriority === 'High'){
        priority = highPriorityClass;
    }

    console.log(priority);
    return priority;
}