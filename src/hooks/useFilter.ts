import {useEffect, useState} from "react";
import {Employee} from "../pages/Admin/models/employee";


const useFilter = (data: any) => {

    const [employees, setEmployees] = useState<Employee[]>()

    const [filter, setFilter] = useState({
        isVaccinated: '',
        typeOfVaccine: '',
        dateIn: '',
        dateFn: '',
        search: ''
    })

    const handleChangeFilter = (e: any) => {

        setFilter({...filter, [e.target.name]: e.target.value})

    }

    useEffect(() => {
        let filterEmployees = data

        if (filter.isVaccinated === '') {
            setEmployees(data)
        } else {

            if (filter.isVaccinated != '') {

                filterEmployees = filterEmployees.filter((employee: Employee) => String(employee.isVaccinated) === String(filter.isVaccinated))

            }
            if (filter.typeOfVaccine != '') {
                filterEmployees = filterEmployees.filter((employee: Employee) => employee.typeOfVaccine === filter.typeOfVaccine)
            }

            if (filter.dateIn != '' && filter.dateFn != '') {
                filterEmployees = filterEmployees.filter((employees: Employee) => Date.parse(employees.vaccinationDate!) > Date.parse(filter.dateIn) && Date.parse(employees.vaccinationDate!) < Date.parse(filter.dateFn))
            }


            setEmployees(filterEmployees)
        }
        if (filter.search != '' && filterEmployees) {
            filterEmployees = filterEmployees.filter((employee: Employee) => employee.names.toLowerCase().includes(filter.search.toLowerCase()))
            setEmployees(filterEmployees)
        }

    }, [filter])

    useEffect(() => {

        setEmployees(data)

    }, [data])

    return { employees, handleChangeFilter, filter}

}

export default useFilter