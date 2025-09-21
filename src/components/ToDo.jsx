import '../styles/Todo.css';
import { getPriorityClass } from '../constants/js/constants';

export default function Todo({todoObj}){

    var priority = getPriorityClass(todoObj.Priority__c);
    return(
        <div className="todo-card">
            <div className="todo-header">
                <h2 className='todo-headerText'>
                    {todoObj.Title__c}
                </h2>
            </div>
            <div className='todo-body'>
                <p className='todo-bodyText'>{todoObj.Description__c}</p>
            </div>
            <div className="todo-footer">
                <h3 className='todo-footerText'>{todoObj.Due_Date__c}</h3>
                <h3 className={`todo-footerText ${priority}`}>{todoObj.Priority__c}</h3>
            </div>
            <div className="todo-footerBtns">
                <button className='completedBtn'>
                    Mark as Completed
                </button>
                <button className='completedBtn'>
                    Remove Task
                </button>
            </div>
        </div>
        // <table>
        //     <tbody>
        //         <td>{todoObj.Title__c}</td>
        //         <td>{todoObj.Description__c}</td>
        //         <td>{todoObj.Due_Date__c}</td>
        //         <td>{todoObj.Priority__c}</td>
        //         {/* <td>{todoObj.Title__c}</td> */}
        //     </tbody>
        // </table>
    )
}