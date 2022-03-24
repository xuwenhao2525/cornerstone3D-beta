import type { vtkImageData } from 'vtk.js/Sources/Common/DataModel/ImageData'
import Point3 from './Point3'
import Metadata from './Metadata'

/**
 * Cornerstone ImageVolume interface.
 */
interface IVolume {
  /** unique identifier for the volume in the cache */
  volumeId: string
  /** volume metadata */
  metadata: Metadata
  /** volume dimensions */
  dimensions: Point3
  /** volume spacing */
  spacing: Point3
  /** volume origin */
  origin: Point3
  /** volume direction */
  direction: Float32Array
  /** volume scalarData */
  scalarData: Float32Array | Uint8Array
  /** volume size in bytes */
  sizeInBytes?: number
  /** volume image data as vtkImageData */
  imageData?: vtkImageData
  /** referenceVolumeId if volume is derived from another volume */
  referenceVolumeId?: string
  /** volume scaling metadata */
  scaling?: {
    PET?: {
      // @TODO: Do these values exist?
      SUVlbmFactor?: number
      SUVbsaFactor?: number
      // accessed in ProbeTool
      suvbwToSuvlbm?: number
      suvbwToSuvbsa?: number
    }
  }
}

export default IVolume