import React from 'react'

const HeadRow = ({item}) => (
	<tr>
		<th key={item.name}>{item.name}</th>
		<th key={item.rate}>{item.rate}</th>
	</tr>
)

export default HeadRow