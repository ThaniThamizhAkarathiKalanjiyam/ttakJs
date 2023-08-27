
    $(document).ready(function () {
        $('#DictListContainer').jtable({
            title: 'சொற் பக்கங்கள்',
            actions: {
                listAction: '/GettingStarted/PersonList',
                createAction: '/GettingStarted/CreatePerson',
                updateAction: '/GettingStarted/UpdatePerson',
                deleteAction: '/GettingStarted/DeletePerson'
            },
            fields: {
                dictionary_termset_id: {
                    key: true,
                    list: false
                },
                edhukai: {
                    title: 'எதுகை',
                    width: '30%',                   
                },
                monai: {
                    title: 'மோனை',
                    width: '30%',                   
                },
                inai: {
                    title: 'இணை',
                    width: '30%',                   
                }
                dictionary_term: {
                    title: 'சொல்',
                    width: '40%'
                },
                dictionary_meaning: {
                    title: 'பொருள்',
                    width: '20%'
                }
            }
        });
    });