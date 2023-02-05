import { Card as ChCard, CardHeader, Heading , CardBody, CardFooter,Text, Grid } from '@chakra-ui/react';
import {StarIcon,TimeIcon} from '@chakra-ui/icons'
import { FC } from 'react';
import { Movie } from '../models/Movies';
import * as React from 'react'
export interface CardProps {
    movie: Movie;

}

const color = 'yellow.400';
const ratings = (number: number) => {
    if (number===1 ) {
        return <StarIcon color={color}/>
    }
    else if(number ===2 ) {
        return (<>
                <StarIcon color={color}/>
                <StarIcon color={color}/>
            </>
            )
    }
    else if(number ===3 ) {
        return (<>
        <StarIcon color={color}/>
        <StarIcon color={color}/>
        <StarIcon color={color}/>
        </>)
    }
    else if(number ===4 ) {
        return (<>
        <StarIcon color={color}/>     
        <StarIcon color={color}/>  
        <StarIcon color={color}/>  
        <StarIcon color={color}/>  
        </>)
    }
    else if(number ===5 ) {
        return (<>
        <StarIcon color={color}/>     
        <StarIcon color={color}/>  
        <StarIcon color={color}/>  
        <StarIcon color={color}/>  
        <StarIcon color={color}/>  
        </>)
    } 
}


export const Card: FC<CardProps> = (props) => {
    return (
        <>
            
            <ChCard
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                m={2}
                maxW='100%'
              
            >
                <CardHeader>
                    {props.movie.title}
                </CardHeader>
                <CardBody>
                    <Text>
                        {props.movie.description}
                    </Text>
                </CardBody>
                <CardFooter>                    
                    {                        
                        ratings(props.movie.rating)
                    }                   
                </CardFooter>
            </ChCard>
            
        </>        
    )
}