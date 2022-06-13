import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

import './SearchBar.css'

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState('')

  const navigate = useNavigate()

  const employeeProfileHandler = (id) => {
    navigate(`/employee/${id}`)
  }

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase())
    })

    if (searchWord === '') {
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  }

  const clearInput = () => {
    setFilteredData([])
    setWordEntered('')
  }

  return (
    <div className='search'>
      <div className='searchInputs'>
        <input
          type='text'
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className='searchIcon'>
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id='clearBtn' onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className='dataResult'>
          {filteredData.slice(0, 10).map((value, key) => {
            return (
              <div
                key={key}
                className='dataItem'
                onClick={() => employeeProfileHandler(value._id)}
                style={{
                  gap: '6px',
                }}
              >
                <span>{value.name}</span>
                <span className='department'>{value.department.name}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar
