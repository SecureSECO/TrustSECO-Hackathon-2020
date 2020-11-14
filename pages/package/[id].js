import Head from 'next/head'
import Link from'next/link'
import {getPackageData, getPackagePaths, getAllPackageIds} from '../../lib/packageData'

export default function Package({postData}) {
    return(
    <div>
        <div>
            {postData.title}
        </div>
        <div>
            {postData.trustScore}
        </div>
        <div>
            {JSON.stringify(postData.dependencies)}
        </div>
        <Link href="/">
            <a>← Back to home</a>
          </Link>
    </div>
    )
}

export async function getStaticPaths(){
    const paths = getAllPackageIds()
    return{
        paths, fallback:false
    }
}

export async function getStaticProps({params}){
    const postData = await getPackageData(params.id)
    return{
        props: {postData}
    }
}