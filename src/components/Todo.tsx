import styles from './Todo.module.css'
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidV4 } from 'uuid'

interface PropsAssignment {
    id: string;
    name: string
    status: boolean
}

export function Todo() {
    const [assignments, setAssignments] = useState<PropsAssignment[]>([])
    console.log(assignments)


    const handleCreateNewAssignment = (data: PropsAssignment) => {
        const newData = {
            id: uuidV4(),
            name: data.name,
            status: false
        }
        setAssignments([...assignments, newData])
        reset()
    }

    const { register, handleSubmit, reset, watch } = useForm<PropsAssignment>()


    const valueName = watch("name")
    const disableButtonIfInputIsEmpty = !valueName

    function deleteAssignment(assignmentId: string) {
        const commentsWithoutDeleteOne = assignments.filter(a => a.id !== assignmentId)
        setAssignments(commentsWithoutDeleteOne)
    }

    function handleMarkAsCompleted(assignment: PropsAssignment) {
        if (assignment.status == false) {
            const updatedAssignment = assignments.map(assig => assig.id === assignment.id ? {
                ...assig,
                status: true
            } : assig)
            setAssignments(updatedAssignment)
        } else {
            const updatedAssignment = assignments.map(assig => assig.id === assignment.id ? {
                ...assig,
                status: false
            } : assig)
            setAssignments(updatedAssignment)
        }

    }

    const totalCompleted = assignments.reduce((total, assignment) => {
        if (assignment.status === true) {
            return total + 1;
        }
        return total
    }, 0)

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
                    <p className={styles.completed}>Concluídas <strong>{totalCompleted} de {assignments.length } </strong></p>
                </div>
            </div>
            {assignments.map((a) => {
                return (
                    <div key={a.id} className={styles.assignment}>
                        <div className={styles.inputRadio}>
                            <input onClick={() => handleMarkAsCompleted(a)} type="checkbox" id={a.id} />
                            <label htmlFor={a.id}>{a.name} </label>
                        </div>
                        <button onClick={() => deleteAssignment(a.id)} ><FiTrash2 /> </button>

                    </div>
                )
            })}

        </main>
    )
}