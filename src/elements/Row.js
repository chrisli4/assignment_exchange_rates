import React from 'react'

const Row = ({item}) => (
	<tr>
		<td key={item.name}>{item.name}</td>
		<td key={item.rate}>{item.rate}</td>
	</tr>
)

export default Row