    export default {
        getTodos: async (setState) => {
            return await fetch('https://61498bf2035b3600175ba32f.mockapi.io/todo')
            .then(res => res.json())
        },

        updateStatus: async (element) => {

            return await fetch(`https://61498bf2035b3600175ba32f.mockapi.io/todo/${element.id}`, {
                method: 'PUT',
                body: JSON.stringify({completed: !element.completed }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(res => res.json())
        },

        createTitle: async (title) => {
            return await fetch(`https://61498bf2035b3600175ba32f.mockapi.io/todo`, {
                method: 'POST',
                body: JSON.stringify({title: title, completed: false}),
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(res => res.json())
        },

        deleteTitle: async (id) => {
            return await fetch(`https://61498bf2035b3600175ba32f.mockapi.io/todo/${id}`, {
                method: 'DELETE'
            })
        },

        updateTitle: async (element) => {
            return await fetch(`https://61498bf2035b3600175ba32f.mockapi.io/todo/${element.id}`, {
                method: 'PUT',
                body: JSON.stringify(element),
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(res => res.json())
        },
    }
