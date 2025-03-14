// import { Gist } from '@shared/schema'

//Gist[]
export const sampleGists = [
    {
        id: 'sample1',
        description: 'Sample React Component',
        files: {
            'component.tsx': {
                content: `const Button = ({ children }) => (
    <button className="px-4 py-2 bg-blue-500 text-white">
        {children}
    </button>
)`,
            },
        },
        owner: 'demo-user',
        createdAt: new Date('2024-03-14'),
        updatedAt: new Date('2024-03-14'),
    },
    {
        id: 'sample2',
        description: 'CSS Snippets',
        files: {
            'styles.css': {
                content: `.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
}`,
            },
        },
        owner: 'demo-user',
        createdAt: new Date('2024-03-13'),
        updatedAt: new Date('2024-03-13'),
    },
]
