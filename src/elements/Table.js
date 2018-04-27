import React from 'react'
import HeadRow from './HeadRow'
import Row from './Row'

const Table = (props) => {

	const {data, header, className} = props
	const classNames = `table ${className ? className : ''}`

	return (
		<table className={classNames}>
			<thead>
				{header.map((item) => (
					<HeadRow key={item.name} item={item} />
					))
				}
			</thead>
			<tbody>
				{data.map((item) => (
					<Row key={item.name} item={item} />
					))
				}
			</tbody>
		</table>
	)
}

export default Table