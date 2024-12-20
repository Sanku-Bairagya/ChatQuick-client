
export const SampleChats = [
{
    avatar:["https://yt3.googleusercontent.com/ytc/AIdro_lEeZP6Urk3JhCp_BnVamf57KSdAv-ZJb2nJqHmW-8ZIuM=s900-c-k-c0x00ffffff-no-rj"],
    name:"Pink Panther",
    _id:"1",
    groupChat:false,
    members:["1","2"]
},
{
    avatar:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZOArjC_5gb8i8qSATtzUuHJI-0A2aqzTFDQ&s",
    ],
    name:"Black Panther",
    _id:"2",
    groupChat:true,
    members:["1","2"]
}
]

export const SampleUsers = [{
    avatar:["https://yt3.googleusercontent.com/ytc/AIdro_lEeZP6Urk3JhCp_BnVamf57KSdAv-ZJb2nJqHmW-8ZIuM=s900-c-k-c0x00ffffff-no-rj"],
    name:"Pink Panther",
    _id:"1",
},
{
    avatar:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZOArjC_5gb8i8qSATtzUuHJI-0A2aqzTFDQ&s"],
    name:"Black Panther",
    _id:"2",
}
]
export const SampleNotification = [
    {
     sender:{
        avatar:["https://yt3.googleusercontent.com/ytc/AIdro_lEeZP6Urk3JhCp_BnVamf57KSdAv-ZJb2nJqHmW-8ZIuM=s900-c-k-c0x00ffffff-no-rj"],
        name:"Pink Panther"
     },
     _id:"1",
    },
    {
     sender:{
        avatar:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZOArjC_5gb8i8qSATtzUuHJI-0A2aqzTFDQ&s"],
        name:"Black Panther"
     },
     _id:"2",
    }
]

export const sampleMessage = [
    {
        attachments:[
            
        ],
        content:"Lauda ka message benchod !",
        _id:"hjfsgdsdf",
        sender:{
            _id:"user._id",
            name:"Chaman",
        },
        chat:"chatId",
        createdAt:"2024-02-12T10:41:30.6302"
    },
    {
        attachments:[
            {
              public_id:"efdef",
              url:"https://www.w3schools.com/howto/img_avatar.png"
            }
        ],
        content:"",
        _id:"sgregrert",
        sender:{
            _id:"jshjskdfh",
            name:"Chaman 23",
        },
        chat:"chatId",
        createdAt:"2024-02-12T10:41:30.6302"
    }
]

export const dashBoardData = {
    users:[
        {
            name:"Pink Panther",
            avatar:"https://yt3.googleusercontent.com/ytc/AIdro_lEeZP6Urk3JhCp_BnVamf57KSdAv-ZJb2nJqHmW-8ZIuM=s900-c-k-c0x00ffffff-no-rj",
            _id: "1",
            username:"pinky🥰",
            friends:20,
            groups:5,
        },
        {
            name:"Black Panther",
            avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZOArjC_5gb8i8qSATtzUuHJI-0A2aqzTFDQ&s",
            _id: "2",
            username:"Blacky 🗿",
            friends:20,
            groups:25,
        }
    ],
    chats:[{
        name:"LabadBass Group",
        avatar:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZOArjC_5gb8i8qSATtzUuHJI-0A2aqzTFDQ&s"],
        _id:1,
        groupChat:false,
        members:[
            {_id:"1",avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZOArjC_5gb8i8qSATtzUuHJI-0A2aqzTFDQ&s"},
            {_id:"2",avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZOArjC_5gb8i8qSATtzUuHJI-0A2aqzTFDQ&s"},
        ],
        totalMembers:2,
        totalMessages:20,
        creator:{
            name:"John Doe",
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
        },
    },
    {
        name:"Lauda Lasan Group",
        avatar:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZOArjC_5gb8i8qSATtzUuHJI-0A2aqzTFDQ&s"],
        _id:2,
        groupChat:false,
        members:[
            {_id:"1",avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZOArjC_5gb8i8qSATtzUuHJI-0A2aqzTFDQ&s"},
            {_id:"2",avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZOArjC_5gb8i8qSATtzUuHJI-0A2aqzTFDQ&s"},
        ],
        totalMembers:2,
        totalMessages:20,
        creator:{
            name:"John Boi",
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
        },
    },

    ],
    messages:[
        {
            attachments:[],
            content:"Laude ka message",
            _id:"sdfg",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"Chaman"
            },
            chat:"chatId",
            groupchat:false,
            createdAt:"2024-02-12T10:41:30.6302"
        },
        {
            attachments:[
                {
                    public_id:"asdfhw 2",
                    url:"https://www.w3schools.com/howto/img_avatar.png"
                }
            ],
            content:"",
            _id:"dfgdfkjgxc",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"Chaman 2"
            },
            chat:"chatId",
            groupchat:true,
            createdAt:"2024-02-12T10:41:30.6302"
        }
    ]
}

