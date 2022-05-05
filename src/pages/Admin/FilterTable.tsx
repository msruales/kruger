import {FormLabel, HStack, Input, InputGroup, InputLeftElement, Select, Stack} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {Filter} from "./models/filter";
import {ChangeEvent} from "react";

interface Props {
    filter: Filter
    handleChangeFilter: (e: ChangeEvent) => void
}
export const FilterTable = ({filter, handleChangeFilter}: Props) => {
    return (
            <HStack>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.300'/>}
                    />
                    <Input name="search" placeholder='Buscar...' onChange={handleChangeFilter}/>
                </InputGroup>

                <InputGroup>
                    <Stack spacing={1}>
                        <FormLabel>Vacunado?</FormLabel>
                        <Select name="isVaccinated" value={filter.isVaccinated} onChange={handleChangeFilter}>
                            <option value=''>Seleccione</option>
                            <option value='true'>VACUNADO</option>
                            <option value='false'>NO VACUNADO</option>
                        </Select>
                    </Stack>
                </InputGroup>
                {
                    filter.isVaccinated && (
                        <>
                            <InputGroup>
                                <Stack spacing={1}>
                                    <FormLabel>Tipo de Vacuna</FormLabel>
                                    <Select value={filter.typeOfVaccine} name='typeOfVaccine'
                                            onChange={handleChangeFilter}>
                                        <option value=''>Seleccione</option>
                                        <option value='Sputnik'>Sputnik</option>
                                        <option value='AstraZeneca'>AstraZeneca</option>
                                        <option value='Pfizer'>Pfizer</option>
                                        <option value='Jhonson&Jhonson'>Jhonson&Jhonson</option>
                                    </Select>
                                </Stack>
                            </InputGroup>

                            <InputGroup>
                                <Stack spacing={1}>
                                    <FormLabel>Fecha inicio - fecha fin</FormLabel>
                                    <Stack direction="row">
                                        <Input type="date" name="dateIn" onChange={handleChangeFilter}/>
                                        <Input type="date" name="dateFn" onChange={handleChangeFilter}/>
                                    </Stack>
                                </Stack>
                            </InputGroup>
                        </>
                    )
                }
            </HStack>
    )
}
export default FilterTable