import styles from './Todo.module.css'
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidV4 } from 'uuid'

interface PropsAssignment {
    id: string;
    name: string
}

export function Todo() {
    const [assignments, setAssignments] = useState<PropsAssignment[]>([])
    console.log(assignments)



    const handleCreateNewAssignment = (data: PropsAssignment) => {
        const newData = {
            id: uuidV4(),
            name: data.name
        }
        setAssignments([...assignments, newData])
        reset()
    }

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<PropsAssignment>()

   
    const valueName = watch("name")
    const disableButtonIfInputIsEmpty = !valueName


    function deleteComment(assignmentId: string) {
        const commentsWithoutDeleteOne = assignments.filter(a => a.id !== assignmentId)        
        setAssignments(commentsWithoutDeleteOne)
    }


    return (
        <main className={styles.main}>
            <form className={styles.formTodo} onSubmit={handleSubmit(handleCreateNewAssignment)} >
                <input
                    type="text"                    
                    placeholder='Adicione uma nova tarefa'
                    {...register("name")}
                />
                <button
                 disabled={disableButtonIfInputIsEmpty} >Criar <FiPlusCircle /></button>
            </form>
            <div className={styles.listTodo}>
                <div className={styles.divCount}>
                    <p>Tarefas criadas <strong>{assignments.length} </strong></p>
                    <p>Concluídas <strong> 0</strong></p>
                </div>
            </div>
            {assignments.map((a) => {
                return (
                    <div key={a.id} className={styles.assignment}>
                        <div className={styles.inputRadio}>
                            <input type="checkbox" id='assignment' />
                            <label htmlFor="assignment">{a.name} </label>
                        </div>
                        <button onClick={() => deleteComment(a.id)} ><FiTrash2 /> </button>

                    </div>
                )
            })}


        </main>
    )
}