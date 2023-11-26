export const actionsTable = (handleEdit, handleDelete) => [
    {
        text: (
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                    fill="#ffffff"
                    d="m16.427 1.963l5.61 5.61L7.61 22.001H2v-5.61L16.427 1.962Zm0 2.828l-2.781 2.782l2.781 2.782l2.782-2.782l-2.782-2.782Zm-1.414 6.978l-2.782-2.782L4 17.22V20h2.782l8.231-8.232Zm7.212 10.232h-9.543v-2h9.543v2Z"
                />
            </svg>
        ),
        className: "btn btn-edit",
        onClick: handleEdit,
    },
    {
        text: (
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                    fill="#ffffff"
                    d="M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6Zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.713T10 8q-.425 0-.713.288T9 9v7q0 .425.288.713T10 17Zm4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.713T14 8q-.425 0-.713.288T13 9v7q0 .425.288.713T14 17ZM7 6v13V6Z"
                />
            </svg>
        ),
        className: "btn btn-delete",
        onClick: handleDelete,
    },
];
